<?php

namespace FSPoster\App\Providers\Core;

final class Container
{
    /** @var array<class-string, mixed> */
    private static array $instances = [];

    public static function set(string $id, $concrete): void
    {
        self::$instances[$id] = $concrete;
    }

    /**
     * @template T
     * @param class-string<T> $id
     * @return T
     */
    public static function get(string $id)
    {
        if (!array_key_exists($id, self::$instances)) {
            throw new \RuntimeException("Service not found: {$id}");
        }

        return self::$instances[$id];
    }
}