<?php

namespace FSPoster\App\SocialNetworks\Threads\Api;

use FSPoster\GuzzleHttp\Client;
use FSPoster\GuzzleHttp\Exception\GuzzleException;
use FSPoster\Psr\Http\Message\ResponseInterface;

class ThreadsClient
{

    private Client $httpClient;

    public ThreadsClientAuthData $authData;

    public ?string  $proxy = null;

    public string $authException = \Exception::class;
    public string $postException = \Exception::class;

    public function __construct($options)
    {
        $this->proxy = empty( $options['proxy'] ) ? null : $options['proxy'];
        $this->httpClient = new Client([
            'verify'        => false,
            'proxy'         => $this->proxy,
            'http_errors'   => false
        ]);

        $this->authData = new ThreadsClientAuthData();
    }

    private function retry(callable $callback)
    {
        $exception = null;
        $loopCount = 5;
        for ($i = 0; $i < $loopCount; $i++) {
            try {
                return $callback();
            } catch (\Exception $e) {
                $exception = $e;
            }
            if ($i < $loopCount - 1) {
                sleep(10);
            }
        }

        throw $exception;
    }

    /**
     * @throws \Exception
     */
    public function sendPost (PostingData $postingData ): array
    {
        $textContent = $postingData->message;
        $containers = [];

        // Other
        foreach ($postingData->uploadMedia as $media)
        {
            $data = [];

            if ( $media['type'] === 'image' )
            {
                $data['media_type'] = 'IMAGE';
                $data['image_url'] = $media['url'];
            }
            else if ( $media['type'] === 'video' )
            {
                $data['media_type'] = 'VIDEO';
                $data['video_url'] = $media['url'];
            }

            if ( count( $postingData->uploadMedia ) > 1 ) {
                $data['is_carousel_item'] = true;
            }
            else {
                $data['text'] = $textContent;
            }

            $containers[] = [
                'id' => $this->retry(function () use ($data) {
                    return $this->createMediaContainer($data);
                }),
                'content' => $data
            ];
        }

        foreach ($containers as $container)
        {
            for ($i = 0; $i < 30; $i++)
            {
                $this->checkMediaContainerIsFinished( $container );
            }
        }

        if ( empty( $containers ) )
        {
            $content = [
                'media_type' => 'TEXT',
                'text' => $textContent
            ];

			if( ! empty( $postingData->link ) )
				$content['link_attachment'] = $postingData->link;

            $containers[] = [
                'id' =>
                    $this->retry(function () use ($content) {
                        return $this->createMediaContainer( $content );
                    }),
                'content' => $content
            ];
        }

        if ( count( $containers ) > 1 )
        {
            $parentContainerId = $this->retry(function () use ($containers, $textContent) {
                $this->createMediaContainer([
                    'media_type' => 'CAROUSEL',
                    'children' => implode(',', array_column($containers, 'id')),
                    'text' => $textContent
                ]);
            });
        }
        else
        {
            $parentContainerId = $containers[0]['id'];
        }

        $postId = $this->retry(function () use ($parentContainerId) {
            return $this->publishMediaContainer( $parentContainerId );
        });

        return $this->getThreadsById( $postId );
    }

    public function exchangeCodeForShortLivedAccessToken($code, $redirectUri)
    {
        $res = $this->httpClient->post('https://graph.threads.net/oauth/access_token', [
            'json' => [
                'client_id' => $this->authData->clientId,
                'client_secret' => $this->authData->clientSecret,
                'grant_type' => 'authorization_code',
                'redirect_uri' => $redirectUri,
                'code' => $code
            ]
        ]);

        $body = json_decode((string) $res->getBody(), true);

        if (isset($body['access_token']) && isset($body['user_id']))
        {
            $this->authData->userId = $body['user_id'];
            $this->authData->userAccessToken = $body['access_token'];
            $this->authData->userAccessTokenExpiresAt = time() + 1 * 60 * 60; // +1 hour
        }

    }

    public function exchangeShortLivedForLongLivedAccessToken()
    {
        $res = $this->httpClient->get("https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=" . $this->authData->clientSecret . "&access_token=" . $this->authData->userAccessToken);

        $body = json_decode((string) $res->getBody(), true);

        if (isset($body['access_token']) && isset($body['expires_in']))
        {
            $this->authData->userAccessToken = $body['access_token'];
            $this->authData->userAccessTokenExpiresAt = time() + $body['expires_in'];
        }
    }

    /**
     * @throws \JsonException
     */
    public function getMe()
    {
        $res = $this->requestWithAuth('GET', "https://graph.threads.net/v1.0/me?fields=id,username,name,threads_profile_picture_url,threads_biography");
        return json_decode($res->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);
    }

    public function prepare(): void
    {
        if ( $this->authData->userAccessTokenExpiresAt - time() < 86400 * 7 ) // 7 day in seconds
        {
            $this->refreshAccessToken();
        }
    }

    /**
     * @throws \JsonException
     */
    public function refreshAccessToken(): void
    {
        $res = $this->requestWithAuth('GET', "https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=" . $this->authData->userAccessToken);

        $body = json_decode($res->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);

        if (isset($body['access_token']) && isset($body['expires_in']))
        {
            $this->authData->userAccessToken = $body['access_token'];
            $this->authData->userAccessTokenExpiresAt = time() + $body['expires_in'];
        }
    }

    /**
     * Create media container and return its ID.
     *
     * Available parameters are below:
     * is_carousel_item => boolean
     * media_type => string, can be TEXT, IMAGE, VIDEO or CAROUSEL
     * image_url => string
     * video_url => string
     * text => string The text associated with the post.
     * children => string A comma-separated list of up to 10 container IDs
     * @throws \Exception
     */
    public function createMediaContainer($content): string
    {
        $res = $this->requestWithAuth('POST', "https://graph.threads.net/v1.0/{$this->authData->userId}/threads", [
            'json' => $content
        ]);

        $body = $this->decodeBodyFromResponse($res);

        if (isset($body['id']))
        {
            return $body['id'];
        }

        throw new \Exception('Unknown error occurred while creating media container for Threads');
    }

    /**
     * @throws \JsonException
     */
    public function getMediaContainer(string $containerId)
    {
        $res = $this->requestWithAuth('GET', "https://graph.threads.net/v1.0/{$containerId}?fields=status,error_message,error");
        return json_decode($res->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);
    }

    /**
     * @throws \Exception
     */
    public function checkMediaContainerIsFinished(array $container): void
    {
        for ($i =0; $i <= 5; $i++)
        {
            $containerInf = $this->getMediaContainer( $container['id'] );

            if ($containerInf['status'] === 'FINISHED') {
                return;// success
            }

            if (isset($containerInf['error_message']))
            {
                throw new \Exception($containerInf['error_message']);
            }

            sleep(10);
        }

        throw new \Exception('Unknown error occurred while checking status of Threads video media container.');
    }

    /**
     * @throws \Exception
     */
    public function publishMediaContainer(string $containerId): string
    {
        $res = $this->requestWithAuth('POST', "https://graph.threads.net/v1.0/{$this->authData->userId}/threads_publish?creation_id=" . $containerId);

        $body = $this->decodeBodyFromResponse($res);

        return $body['id'];
    }

    /**
     * @throws \JsonException
     */
    public function getThreadsById(string $threadsId)
    {
        $res = $this->requestWithAuth('GET', "https://graph.threads.net/v1.0/{$threadsId}?fields=id,shortcode,permalink");
        return json_decode($res->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);
    }

    /**
     * @throws GuzzleException
     */
    private function requestWithAuth(string $method, $uri = '', array $options = [])
    {
        $options['headers']['Authorization'] = 'Bearer ' . $this->authData->userAccessToken;
        $res = $this->httpClient->request($method, $uri, $options);

        if ($res->getStatusCode() === 401) {
            throw new $this->authException();
        }

        return $res;
    }

    /**
     * @throws \Exception
     */
    private function decodeBodyFromResponse(ResponseInterface $res): array
    {
        $body = json_decode($res->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);

        if (isset($body['error']['error_user_msg']) || isset($body['error']['error_user_title']))
        {
            throw new \Exception($body['error']['error_user_title'] . ' ' . $body['error']['error_user_msg']);
        }

        if (isset($body['error']['message']))
        {
            throw new \Exception($body['error']['message']);
        }

        if (isset($body['error']))
        {
            throw new \Exception(json_encode($body));
        }

        return $body;
    }
}
