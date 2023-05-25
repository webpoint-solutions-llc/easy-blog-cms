import React from 'react';

import clsx from 'clsx';
import { IconFunctionType } from '../iconFunctionType.interface';

const SelectDownArrowIcon: React.FC<IconFunctionType> = ({ className }) => {
  return (
    <svg
      className={clsx(className ? className : 'w-[18px]')}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6.75L9 12.75L15 6.75"
        stroke={'#888483'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SelectDownArrowIcon;
