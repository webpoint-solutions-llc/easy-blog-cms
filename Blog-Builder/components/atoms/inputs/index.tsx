import clsx from 'clsx';
import React, { FC, useState } from 'react';

import { IInputs } from './inputs.types';
import EyeIcon from '@atoms/icons/Eye-Icon';
import EyeSlashIcon from '@atoms/icons/Eye-Slash-Icon';
import ExclamationIcon from '@atoms/icons/Exclamation-Icon';

import toolTipsCSS from '@particles/css/toolTip.module.css';

/**
 * Custom Input Component
 * @props width <string> - Width of the input component. Optional.
 * @props maxWidth <string> - Max Width of the input component. Optional.
 * @props disabled <boolean> - Disables the input section if it is true. Defaults to false.
 * @props status <boolean> - Status of the icon in input to how icons. Defaults to false.
 * @props error <string|boolean> - Error status and Error message of the input section. Defaults to false.
 * @props Icon <IconFunctionType> - Icon to be displayed in the input section. Optional.
 * @props ...props - All of the other default props accepted by JSX input element.
 *
 * @returns Custom Input component as JSX Element.
 */
const Inputs: FC<IInputs> = ({
  width,
  maxWidth,
  disabled = false,
  status = false,
  error = false,
  Icon,
  IconClass = 'w-5 lg:w-6',
  ...props
}) => {
  const [passwordState, setPasswordState] = useState(true);
  let statusIcon;
  if (status) {
    statusIcon = error ? (
      <div className={toolTipsCSS.tooltip}>
        <div className="relative">
          <ExclamationIcon className="w-5 lg:w-6 text-error" />
          <span className={clsx(toolTipsCSS.tooltipText, 'font-medium text-[11px] leading-[14.85px]')}>{error}</span>
        </div>
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    );
  }

  return (
    <div
      style={{ width, maxWidth }}
      className={clsx(
        'flex flex-row justify-between bg-white',
        !(props.type === 'radio' || props.type === 'checkbox') && 'border border-normal-input rounded-md h-[42px]',
        disabled && 'bg-[#EDEDED]',
        error && 'border-error',
        props.className,
      )}
    >
      <div className={clsx('flex flex-row gap-2 px-3 py-4 w-full items-center')}>
        {!(props.type === 'radio' || props.type === 'checkbox') && Icon && <Icon className={IconClass} />}
        <input
          {...props}
          type={!passwordState ? 'text' : props.type}
          className={clsx(
            props.className,
            'outline-none ease-in w-full focus:outline-none border-0 p-0 focus:border-none placeholder:text-bodysmall placeholder-neutral-500  focus:shadow-none focus:ring-0 focus:ring-none',
            status && error ? 'border-error' : 'border-normal-input',
            disabled && 'bg-[#EDEDED]',
            (props.type === 'radio' || props.type === 'checkbox') && 'accent-primary-60 text-primary-60',
          )}
          min={0}
          disabled={disabled}
        ></input>
        {!(props.type === 'radio' || props.type === 'checkbox') && statusIcon}
      </div>
      {props.type === 'password' && (
        <div
          className="h-inherit w-[55px] flex justify-center items-center cursor-pointer"
          onClick={() => setPasswordState((prevValue) => !prevValue)}
        >
          {passwordState ? <EyeSlashIcon /> : <EyeIcon />}
        </div>
      )}
    </div>
  );
};

export default Inputs;
