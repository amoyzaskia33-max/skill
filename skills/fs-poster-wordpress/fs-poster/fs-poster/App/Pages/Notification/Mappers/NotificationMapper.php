<?php

namespace FSPoster\App\Pages\Notification\Mappers;

use FSPoster\App\Pages\Notification\DTOs\Response\NotificationResponse;
use FSPoster\App\Providers\DB\Collection;

class NotificationMapper
{
    public function toResponse(Collection $notification)
    {
        $notificationResponse = new NotificationResponse();

        $userLogin = null;

        if (!empty($notification->user_id)) {
            $user = get_userdata($notification->user_id);
            $userLogin = $user->user_login ?? null;
        }

        $notificationResponse->setId($notification->id);
        $notificationResponse->setUserId($notification->user_id);
        $notificationResponse->setType($notification->type);
        $notificationResponse->setTitle($notification->title);
        $notificationResponse->setMessage($notification->message);
        $notificationResponse->setActionType($notification->action_type);
        $notificationResponse->setActionData($notification->action_data);
        $notificationResponse->setReadAt($notification->read_at);
        $notificationResponse->setUserLogin($userLogin);
        $notificationResponse->setCreatedAt($notification->created_at);

        return $notificationResponse;
    }

    /**
     * @param array $data
     * @return array<NotificationResponse>
     */
    public function toListResponse(array $data): array
    {
        return array_map([$this, 'toResponse'], $data);
    }
}