import React from 'react';

import clsx from 'clsx';
import { IconFunctionType } from '../iconFunctionType.interface';

const SadFaceIcon: React.FC<IconFunctionType> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className ? className : 'w-20')}
      fill="none"
      viewBox="0 0 93 92"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M60.642 66.858c-7.81-7.81-20.474-7.81-28.284 0M61.5 36h-.05M31.5 36h-.05M1.5 46c0 24.853 20.147 45 45 45s45-20.147 45-45-20.147-45-45-45-45 20.147-45 45z"
      ></path>
    </svg>
  );
};

export default SadFaceIcon;
