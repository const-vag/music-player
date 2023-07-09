import { ComponentProps } from 'react';
import {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native-paper';

type FormControllerProps<TFieldValues extends FieldValues, TContext = any> = {
  control: Control<TFieldValues, TContext>;
  name: FieldPath<TFieldValues>;
  rules?: ControllerProps<TFieldValues>['rules'];
};

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = ComponentProps<typeof TextInput> &
  FormControllerProps<TFieldValues, TContext> & {
    sizeVariant?: 'half-size' | 'full-size';
  };
