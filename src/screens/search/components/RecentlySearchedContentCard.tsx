import React from 'react';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { Image } from 'react-native';

const IMAGE_SIZE = 50;

type RecentlySearchedContentCardProps = {
  onPress: () => void;
  imageSrc: string;
  name: string;
};

export const RecentlySearchedContentCard = (
  props: RecentlySearchedContentCardProps
) => {
  const { imageSrc, onPress, name } = props;
  return (
    <Box p={5} style={{ width: '50%' }}>
      <TouchableOpacity style={{ width: '100%' }} onPress={onPress}>
        <Surface style={{ width: '100%' }} elevation={4}>
          <Box
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              columnGap: 15,
            }}
            direction="row"
            transparent
          >
            <Image
              style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              source={{ uri: imageSrc }}
            />
            <Typography truncate>{name}</Typography>
          </Box>
        </Surface>
      </TouchableOpacity>
    </Box>
  );
};
