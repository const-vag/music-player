import { TextFieldProps } from './types';

type SizeVariant = TextFieldProps['sizeVariant'];
export const getMinWidth = (sizeVariant: SizeVariant) => {
  if (sizeVariant === 'half-size') return '50%';
  return '100%';
};
