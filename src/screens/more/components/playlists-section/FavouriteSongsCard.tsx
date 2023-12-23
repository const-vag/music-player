import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../../../../ui-kit/Box/Box';
import { MaterialIcon } from '../../../../ui-kit/MaterialIcon';
import { Typography } from '../../../../ui-kit/Typography';
import { MoreRoutes, MoreStackParamList } from '../../types';

const IMAGE_SIZE = 35;

export const LikedSongsCard = () => {
  const navigation = useNavigation<StackNavigationProp<MoreStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(MoreRoutes.FAVORITE_SONGS)}
    >
      <Box
        pv={10}
        style={{
          columnGap: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        direction="row"
      >
        <MaterialIcon size={IMAGE_SIZE} name="heart-box" />
        <Typography variant="bodyLarge">Favorite songs</Typography>
      </Box>
    </TouchableOpacity>
  );
};
