import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { TextInput, useTheme } from 'react-native-paper';
import { Box } from '../../ui-kit/Box/Box';
import { Typography } from '../../ui-kit/Typography';
import { TextFieldProps } from './types';
import { getMinWidth } from './helpers';

export const TextField = <TFormValues extends FieldValues>(
  props: TextFieldProps<TFormValues>
) => {
  const theme = useTheme();
  const {
    control,
    name,
    rules,
    sizeVariant = 'half-size',
    ...textInputProps
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <Box>
          <TextInput
            {...textInputProps}
            style={[
              { minWidth: getMinWidth(sizeVariant) },
              textInputProps.style,
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={Boolean(error)}
          />
          {error && (
            <Typography
              style={{ color: theme.colors.error }}
              variant="bodySmall"
            >
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

TextField.Icon = TextInput.Icon;
