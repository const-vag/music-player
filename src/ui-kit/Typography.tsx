import React, { ComponentProps } from 'react';
import { Text } from 'react-native-paper';

type TextProps = ComponentProps<typeof Text>;
type TypographyProps = TextProps & { truncate?: boolean };
export const Typography = (props: TypographyProps) => {
  const { truncate, ...restProps } = props;

  const truncateProps: Omit<TextProps, 'children'> = {
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    style: { flex: 1 },
  };

  return <Text {...(truncate ? truncateProps : {})} {...restProps} />;
};
