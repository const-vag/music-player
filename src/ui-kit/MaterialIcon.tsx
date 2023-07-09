import React, { ComponentProps } from 'react';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/**
 * @param name https://pictogrammers.com/library/mdi/
 */

export type MaterialIconProps = ComponentProps<typeof Icon>;

export const MaterialIcon = (props: MaterialIconProps) => {
  const theme = useTheme();

  const { color = theme.colors.onBackground, size = 24 } = props;

  return <Icon {...props} color={color} size={size} />;
};
