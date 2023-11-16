import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Typography } from '../../../ui-kit/Typography';
import { ContentRequiredInfo } from '../../../api/requests/search.api';
import { Box } from '../../../ui-kit/Box/Box';

type SearchArtistResultProps = {
  item: ContentRequiredInfo;
  onPress: () => void;
};

const IMAGE_SIZE = 50;

export const SearchContentResult = ({
  item,
  onPress,
}: SearchArtistResultProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        direction="row"
      >
        <Image
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
          source={{ uri: item.image }}
        />
        <Typography style={{ marginLeft: 20 }} truncate variant="titleMedium">
          {item.name}
        </Typography>
      </Box>
    </TouchableOpacity>
  );
};
