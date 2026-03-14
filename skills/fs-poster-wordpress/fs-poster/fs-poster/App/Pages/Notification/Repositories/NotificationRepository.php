<?php

namespace FSPoster\App\Pages\Notification\Repositories;

use FSPoster\App\Models\Notification;
use FSPoster\App\Providers\DB\Collection;
use FSPoster\App\Providers\Helpers\Date;

class NotificationRepository
{
    /**
     * @param int $userId
     * @return array
     */
    public function getNotificationsByUserId(int $userId): array
    {
        return Notification::where('user_id', $userId)->orderBy('id DESC')->fetchAll();
    }

    /**
     * @param int $userId
     * @param int $notificationId
     * @return Collection|null
     */
    public function getNotificationByUserIdAndNotificationId(int $userId, int $notificationId): ?Collection
    {
        return Notification::where('user_id', $userId)->where('id', $notificationId)->whereIsNull('read_at')->fetch();
    }

    public function updateNotificationByNotificationId(int $notificationId): void
    {
        Notification::where('id', $notificationId)->whereIsNull('read_at')->update(['read_at' => Date::format('Y-m-d H:i:s')]);
    }

    /**
     * @param int $userId
     * @return void
     */
    public function updateNotificationsByUserId(int $userId): void
    {
        Notification::where('user_id', $userId)->whereIsNull('read_at')->update(['read_at' => Date::format('Y-m-d H:i:s')]);
    }

    /**
     * @param int $userId
     * @return void
     */
    public function deleteNotificationsByUserId(int $userId): void
    {
        Notification::where('user_id', $userId)->delete();
    }

    public function create(array $data): void
    {
        Notification::insert($data);
    }
}

