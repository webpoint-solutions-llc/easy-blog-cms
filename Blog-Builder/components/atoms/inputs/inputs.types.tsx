import { IconFunctionType } from '@atoms/icons/iconFunctionType.interface';

export enum EInputTypes {
  'text' = 'text',
  'radio' = 'radio',
  'checkbox' = 'checkbox',
  'file' = 'file',
  'email' = 'email',
  'password' = 'password',
}

export interface IInputs extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  error?: string;
  status?: boolean;
  Icon?: React.FC<IconFunctionType>;
  IconClass?: string;
  children?: string;
}
