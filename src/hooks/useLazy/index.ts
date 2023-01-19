import { useCallback, useRef } from 'react';

export const useLazy = <T extends (...args: Parameters<T>) => void>(fn: T, ms: number) => {
  const timerRef = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      timerRef.current && window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => fn(...args), ms);
    },
    [fn, ms],
  );
};
