import { useState } from 'react';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useSearchQuery } from '../../api/hooks/search.query';
import { SongWithAlbumImage } from '../../api/requests/songs.api';
import { ContentRequiredInfo } from '../../api/requests/search.api';

export const useSearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const { data } = useSearchQuery(keyword);

  const delayedFn = useDebounce(setKeyword, 1000);

  const searchResultSections: {
    title: 'Songs' | 'Artists' | 'Albums';
    data: (SongWithAlbumImage | ContentRequiredInfo)[];
  }[] = [
    {
      title: 'Songs',
      data: data?.songs || [],
    },
    {
      title: 'Artists',
      data: data?.artists || [],
    },
    {
      title: 'Albums',
      data: data?.albums || [],
    },
  ];

  console.log(
    '🚀 ~ file: useSearchScreen.tsx:17 ~ useSearchScreen ~ searchResultSections:',
    searchResultSections
  );

  return { delayedFn, searchResultSections };
};
