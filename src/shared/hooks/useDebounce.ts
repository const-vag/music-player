import { debounce } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = <TCallback extends (...args: any) => any>(
  cb: TCallback,
  wait: number
) => {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  return useMemo(() => debounce(cbRef.current, wait), [wait]);
};
