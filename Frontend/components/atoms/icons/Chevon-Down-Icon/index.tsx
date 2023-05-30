import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * ChevonDown Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-5 h-5)
 * @returns ChevonDown JSX SVG Icon
 */
const ChevonDownIcon: React.FC<IconFunctionType> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8327 12.5L9.99935 6.66667L4.16602 12.5"
        stroke={'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevonDownIcon;
