import { IInputs } from '@atoms/inputs/inputs.types';

export interface IInputSection extends IInputs {
  label?: string | JSX.Element;
  labelClass?: string;
  errorAdd?: string;
  containerClass?: string;
  bottomError?: false;
}
