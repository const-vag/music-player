import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Box, BoxProps } from './Box/Box';
import { Spacer } from './Spacer';
import { uiVariables } from './variables';
import { usePlayerStore } from '../shared/stores/player/usePlayerStore';

type ContainerProps = BoxProps & {
  onClose?: () => void;
  topAwareSpacer?: boolean;
  variant?: 'screen' | 'modal';
};

export const Container = (props: ContainerProps) => {
  const {
    children,
    onClose,
    topAwareSpacer = true,
    variant = 'screen',
  } = props;

  const { song } = usePlayerStore();

  return (
    <Box style={{ flex: 1 }}>
      {topAwareSpacer && <Spacer size={70} />}
      <StatusBar style="light" />
      {onClose && (
        <Box direction="row" style={{ alignSelf: 'flex-start' }}>
          <IconButton
            onPress={onClose}
            icon={variant === 'modal' ? 'chevron-down' : 'chevron-left'}
            size={34}
          />
        </Box>
      )}
      <Box
        {...props}
        ph={
          props.ph === undefined
            ? uiVariables.spacer.horizontalPadding
            : props.ph
        }
        style={styles.container}
      >
        {children}
        {/* we need this spacer for Mini player */}
        {song ? <Spacer size={70} /> : null}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
