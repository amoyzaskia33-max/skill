import { useState, useEffect } from "react";
import type { LoadingState } from "@/lib/utils";

/**
 * 비동기 작업 로딩 상태 관리 훅
 */
export function useLoadingState(
  asyncFunction: () => Promise<void>,
  dependencies: any[] = []
) {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      setLoadingState("loading");
      setError(null);

      try {
        await asyncFunction();
        if (isMounted) {
          setLoadingState("success");
        }
      } catch (err) {
        if (isMounted) {
          setLoadingState("error");
          setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { loadingState, error };
}
