<?php

namespace FSPoster\App\Pages\Notification\Controllers;

use FSPoster\App\Pages\Notification\Services\NotificationService;
use FSPoster\App\Providers\Context\UserContext;
use FSPoster\App\Providers\Core\Container;
use FSPoster\App\Providers\Core\RestRequest;

class NotificationController
{
    private NotificationService $service;
    private UserContext $userContext;

    public function __construct()
    {
        $this->service = new NotificationService();
        $this->userContext = Container::get(UserContext::class);
    }

    /**
     * @return array|string[]
     */
    public function list(): array
    {
        $userId = $this->userContext->id;

        return ['notifications' => $this->service->getNotificationList($userId)];
    }

    /**
     * @param RestRequest $request
     * @return array
     */
    public function markAsRead(RestRequest $request): array
    {
        $notificationId = $request->param('notification_id', 0, RestRequest::TYPE_INTEGER);

        $userId = $this->userContext->id;

        $this->service->markAsRead($notificationId, $userId);

        return [];
    }

    /**
     * @return array
     */
    public function makeAllAsRead(): array
    {
        $userId = $this->userContext->id;

        $this->service->markAllAsRead($userId);

        return [];
    }

    /**
     * @return array
     */
    public function clear(): array
    {
        $userId = $this->userContext->id;

        $this->service->clear($userId);

        return [];
    }
}
