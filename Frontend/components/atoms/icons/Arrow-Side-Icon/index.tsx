import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

const ArrowSideIcon: React.FC<IconFunctionType> = ({ className = 'w-4 lg:w-5 text-neutral-900' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke={'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 5L19 12L12 19"
        stroke={'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowSideIcon;
