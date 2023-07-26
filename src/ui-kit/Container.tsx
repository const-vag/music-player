import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Box, BoxProps } from './Box/Box';
import { Spacer } from './Spacer';
import { uiVariables } from './variables';

type ContainerProps = BoxProps & {
  onClose?: () => void;
};

export const Container = (props: ContainerProps) => {
  const { children, onClose } = props;

  return (
    <Box style={{ flex: 1 }}>
      <StatusBar style='light' />
      {onClose && (
        <Box direction='row' style={{ alignSelf: 'flex-start' }}>
          <IconButton onPress={onClose} icon='chevron-down' size={34} />
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
        <Spacer size={70} />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
