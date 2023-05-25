import React from 'react';

import clsx from 'clsx';
import { IconFunctionType } from '../iconFunctionType.interface';

const ClockIcon: React.FC<IconFunctionType> = ({ className, color = '#544C61' }) => {
  return (
    <svg className={clsx('w-4', className)} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 5.83333V8.5L10 10.5M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C11.3137 2.5 14 5.18629 14 8.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
