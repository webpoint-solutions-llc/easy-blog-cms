import React, { FC, useId } from 'react';

import clsx from 'clsx';
import CreatableSelect from 'react-select/creatable';
import Select, { Props, components } from 'react-select';

import ExclamationIcon from '@atoms/icons/Exclamation-Icon';
import SelectDownArrowIcon from '@atoms/icons/Select-Down-Arrow-Icon';
import InformationCircleIcon from '@atoms/icons/InformationCircle-Icon';

import toolTipsCSS from '@particles/css/toolTip.module.css';

interface IReactSelect extends Props {
  label?: string;
  containerClassName?: string;
  value: string[] | string;
  onValueChange: (data: string[] | string) => void;
  labelClassName?: string;
  locationIcon?: boolean;
  error?: string;
  border?: string;
  errorToolTip?: boolean;
  downArrow?: boolean;
  backgroundColor?: string;
  placeholderColor?: string;
  valueColor?: string;
  maxHeight?: string;
  borderRadius?: string;
  customSelect?: boolean;
}

/**
 * Custom React Select component
 * @props border <string> - String representing border in css. Defaults to '1px solid #8883ae'
 * @props downArrow <boolean> - If true, react select shown the dropdown arrow. Defaults to false.
 * @props backgroundColor <string> - Color code for the background component of the background of react-select. Defaults to '#fff'
 * @props placeholderColor <string> - Color code for the placeholder component of the react-select. Defaults to '#8883ae'
 * @props valueColor <string> - Color code for the value selected components of the react-select. Defaults to '#000'
 * @props maxHeight <string> - Css value for maxHeight component of react-select. Defaults to 'auto'
 * @props ...props - Other Default components given default by react-select package
 *
 * @returns Custom JSX react-select package
 */
const ReactSelect: FC<IReactSelect> = ({
  border = '1px solid #CDCBCB',
  downArrow,
  backgroundColor = '#fff',
  placeholderColor = '#A5A5A5',
  valueColor = '#000',
  maxHeight = '42px',
  errorToolTip,
  borderRadius = '4px',
  customSelect = false,
  ...props
}) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      // state: any -> can be added if needed
      ...base,

      // width:'20rem',
      // outline: '1px solid white',
      padding: '0.5rem 0px',
      // border: '1px solid #8883AE',
      border: props.error ? '1px solid #DB1920' : border,
      boxShadow: 'none',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      color: placeholderColor,
      backgroundColor: backgroundColor,
      maxHeight: maxHeight,
      alignContent: maxHeight ? 'center' : 'auto',
      borderRadius: borderRadius,
      '&:hover': {
        borderColor: state.isFocused ? '' : base.borderColor,
      },
    }),
    placeholder: (defaultStyles: any) => ({ ...defaultStyles, color: placeholderColor }),
    singleValue: (provided: any) => ({ ...provided, color: valueColor }),
    multiValue: (style: any) => ({
      ...style,
      backgroundColor: 'rgba(24, 119, 242, 0.05)',
      border: '1px solid rgba(24, 119, 242, 0.4)',
      borderRadius: '8px',
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: '#1877F2',
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      ':hover': {
        backgroundColor: 'rgba(24, 119, 242, 0.05)',
        color: '#DB1920',
      },
    }),
  };

  let statusIcon: JSX.Element | undefined;

  if (errorToolTip) {
    statusIcon = props.error ? (
      <div className={toolTipsCSS.tooltip}>
        <div className="relative">
          <ExclamationIcon className="w-5 lg:w-6 text-error" />
          <span className={clsx(toolTipsCSS.tooltipText, 'font-medium text-[11px] leading-[14.85px]')}>
            {props.error}
          </span>
        </div>
      </div>
    ) : (
      <React.Fragment></React.Fragment>
    );
  }

  return (
    <div className={clsx(props.containerClassName)}>
      {props.label && (
        <label className={props.labelClassName ? props.labelClassName : 'text-sm text-neutral-700'}>
          {props.label}
        </label>
      )}
      <div className={clsx(props.error && 'flex flex-col gap-2')}>
        {customSelect ? (
          <CreatableSelect
            // components={{ ValueContainer }}
            styles={customStyles}
            {...props}
            value={
              props.isMulti
                ? props?.options?.filter((item: any) => props?.value?.toString().includes(item?.value?.toString()))
                : props?.options?.find((item: any) => item.value?.toString() === props.value?.toString())
            }
            onChange={(value: any) => {
              if (props.isMulti) {
                props.onValueChange(value.map((item: any) => item.value));
              } else {
                props.onValueChange(value.value);
              }
            }}
            instanceId={useId()}
            components={{
              DropdownIndicator: (props: any) => {
                if (downArrow) {
                  return (
                    <components.DropdownIndicator {...props}>
                      <SelectDownArrowIcon />
                    </components.DropdownIndicator>
                  );
                } else if (statusIcon) {
                  return <components.DropdownIndicator {...props}>{statusIcon}</components.DropdownIndicator>;
                } else {
                  return null;
                }
              },
              IndicatorSeparator: () => null,
            }}
          />
        ) : (
          <Select
            // components={{ ValueContainer }}
            styles={customStyles}
            {...props}
            value={
              props.isMulti
                ? props?.options?.filter((item: any) => props?.value?.toString().includes(item?.value?.toString()))
                : props?.options?.find((item: any) => item.value?.toString() === props.value?.toString())
            }
            onChange={(value: any) => {
              if (props.isMulti) {
                props.onValueChange(value.map((item: any) => item.value));
              } else {
                props.onValueChange(value.value);
              }
            }}
            instanceId={useId()}
            components={{
              DropdownIndicator: (props: any) => {
                if (downArrow && !statusIcon) {
                  return (
                    <components.DropdownIndicator {...props}>
                      <SelectDownArrowIcon />
                    </components.DropdownIndicator>
                  );
                } else if (statusIcon) {
                  return <components.DropdownIndicator {...props}>{statusIcon}</components.DropdownIndicator>;
                } else {
                  return null;
                }
              },
              IndicatorSeparator: () => null,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReactSelect;
