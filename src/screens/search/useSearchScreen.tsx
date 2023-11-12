import { useState } from 'react';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useSearchQuery } from '../../api/hooks/search.query';

export const useSearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const { data } = useSearchQuery(keyword);

  const logme = (input: string) => {
    setKeyword(input);
    console.log(input);
  };

  const delayedFn = useDebounce(logme, 1000);

  return { delayedFn, searchResult: data };
};
