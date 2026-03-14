<?php

namespace FSPoster\App\Pages\Notification\Services;

use FSPoster\App\Pages\Notification\DTOs\Request\NotificationRequest;
use FSPoster\App\Pages\Notification\Mappers\NotificationMapper;
use FSPoster\App\Pages\Notification\Repositories\NotificationRepository;

class NotificationService
{
    private NotificationRepository $repository;

    public function __construct()
    {
        $this->repository = new NotificationRepository();
    }

    /**
     * @param int $userId
     * @return array
     */
    public function getNotificationList(int $userId): array
    {
        $notifications = $this->repository->getNotificationsByUserId($userId);

        return (new NotificationMapper())->toListResponse($notifications);
    }

    /**
     * @param int $notificationId
     * @param int $userId
     * @return void
     */
    public function markAsRead(int $notificationId, int $userId): void
    {
        if ($notificationId <= 0) {
            throw new \RuntimeException(fsp__('Invalid notification ID'));
        }

        $notification = $this->repository->getNotificationByUserIdAndNotificationId($userId, $notificationId);

        if (!$notification) {
            throw new \RuntimeException(fsp__('Notification not found'));
        }

        $this->repository->updateNotificationByNotificationId($notificationId);
    }

    /**
     * @param int $userId
     * @return void
     */
    public function markAllAsRead(int $userId): void
    {
        $unreadNotifications = $this->repository->getNotificationsByUserId($userId);

        if (!$unreadNotifications) {
            throw new \RuntimeException(fsp__('No unread notifications found'));
        }

        $this->repository->updateNotificationsByUserId($userId);
    }

    /**
     * @param int $userId
     * @return void
     */
    public function clear(int $userId): void
    {
        $this->repository->deleteNotificationsByUserId($userId);
    }

    public function createNotification(NotificationRequest $request): void
    {
        $data = [
            'user_id' => $request->getUserId(),
            'type' => $request->getType(),
            'title' => $request->getTitle(),
            'message' => $request->getMessage(),
            'action_type' => $request->getActionType(),
            'action_data' => $request->getActionData(),
        ];

        $this->repository->create($data);
    }
}
