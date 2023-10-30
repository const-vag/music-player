import { useDebounce } from '../../shared/hooks/useDebounce';

export const useSearchScreen = () => {
  const logme = (i: string) => {
    console.log(i);
  };

  const delayedFn = useDebounce(logme, 1000);

  return { delayedFn };
};
