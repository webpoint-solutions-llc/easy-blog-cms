import { IconFunctionType } from '@atoms/icons/iconFunctionType.interface';

export enum EButtonType {
  'primary' = 'p',
  'secondary' = 's',
  'outline' = 'o',
  'outlineBtnSecondary' = 'os',
  'none' = 'n',
}

export enum EIconSize {
  'small' = 'sm',
  'medium' = 'md',
  'large' = 'lg',
  'none' = 'n',
}

export enum EBIconPlacing {
  'left' = 'left',
  'right' = 'right',
  'no-icon' = 'null',
}

export interface Ibutton extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLInputElement> {
  btnType?: EButtonType;
  iconSize?: EIconSize;
  iconPlace?: EBIconPlacing;
  loading?: boolean;
  width?: string;
  transparent?: boolean;
  Icon?: React.FC<IconFunctionType>;
  maxWidth?: string;
  transparentTB?: string;
}
