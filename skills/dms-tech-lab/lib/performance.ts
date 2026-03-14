import { memo } from "react";

/**
 * 리렌더링 최적화를 위한 고차 컴포넌트
 *
 * @example
 * const MyComponent = memo(function MyComponent({ data }) {
 *   return <div>{data}</div>;
 * });
 */
export function withMemo<P extends object>(
  Component: React.ComponentType<P>,
  arePropsEqual?: (prevProps: P, nextProps: P) => boolean
) {
  return memo(Component, arePropsEqual);
}
