import clsx from 'clsx';
import React from 'react';
import Inputs from '@atoms/inputs';

import { IInputSection } from './inputSection.interface';
import InformationCircleIcon from '@atoms/icons/InformationCircle-Icon';

/**
 * Input section component including the labels and errors with custom input element
 * @props label <string|JSX.Element> - Label of the input. Optional
 * @props labelClass <string> - Style class of the label component. Optional when there is not label component.
 * @props errorAdd <string> - Shows required `*` symbol when it has value. Optional.
 * @props containerClass - Style class for whole section. Optional
 * @props bottomError <boolean> - Show error bottom for input element
 * @props ...props - Other default props for input JSX component
 * @returns
 */
const InputSection: React.FC<IInputSection> = ({
  label,
  labelClass,
  errorAdd,
  containerClass,
  bottomError = true,
  ...props
}) => {
  return (
    <div className={clsx('flex flex-col', containerClass)}>
      {label && (
        <label htmlFor={props.id} className={labelClass}>
          {label}
          {errorAdd && <span className="text-error ml-2">*</span>}
        </label>
      )}
      <div className={clsx(props.error && 'flex flex-col gap-1', props.disabled && 'bg-[#EDEDED]')}>
        <Inputs className="outline-none" {...props} />
        {bottomError && props.error && (
          <span className="flex flex-row gap-2 text-sm text-error">
            <InformationCircleIcon color="#DB1920" />
            {props.error}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputSection;
