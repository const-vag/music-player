import { useQuery } from '@tanstack/react-query';
import { getSearchRequest } from '../requests/search.api';
import { ErrorResponse } from '../shared-types';
import { isAxiosError } from 'axios';

const SEARCH_QUERY_KEY = 'search';
export const useSearchQuery = (keyword: string) => {
  return useQuery([SEARCH_QUERY_KEY, keyword], () => getSearchRequest(keyword), {
    enabled: Boolean(keyword),
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(
          '🚀 ~ file: search.api.ts:12 ~ useSearchQuery ~ error:',
          error.response?.data
        );
      }
    },
  });
};
