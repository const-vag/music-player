import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BoxProps } from './types';

export const Box = (props: BoxProps) => {
  const theme = useTheme();

  const { direction = 'column', expand = false, transparent = false } = props;

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: transparent
            ? 'transparent'
            : theme.colors.background,
          flexDirection: direction,
          margin: props.m,
          marginBottom: props.mb,
          marginTop: props.mt,
          marginLeft: props.ml,
          marginRight: props.mr,
          marginHorizontal: props.mh,
          marginVertical: props.mv,
          padding: props.p,
          paddingBottom: props.pb,
          paddingTop: props.pt,
          paddingLeft: props.pl,
          paddingRight: props.pr,
          paddingHorizontal: props.ph,
          paddingVertical: props.pv,
        },
        expand ? styles.boxExpanded : styles.box,
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
  },
  boxExpanded: {
    alignItems: 'stretch',
    minWidth: '100%',
  },
});
export { BoxProps };
