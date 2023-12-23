import React from 'react';
import { Box } from '../../../ui-kit/Box/Box';
import { TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { Typography } from '../../../ui-kit/Typography';
import { MaterialIcon } from '../../../ui-kit/MaterialIcon';

type RadioPlaylistContentCardProps = {
  onPress: () => void;
  name: string;
};
const RadioPlaylistContentCard = ({
  name,
  onPress,
}: RadioPlaylistContentCardProps) => {
  return (
    <Box p={5} style={{ width: '50%' }}>
      <TouchableOpacity style={{ width: '100%' }} onPress={onPress}>
        <Surface style={{ width: '100%', borderRadius: 5 }} elevation={4}>
          <Box
            m={15}
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              columnGap: 15,
            }}
            direction="row"
            transparent
          >
            <MaterialIcon name="music" />
            <Typography truncate>{name}</Typography>
          </Box>
        </Surface>
      </TouchableOpacity>
    </Box>
  );
};

export default RadioPlaylistContentCard;
