import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Exclamation Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @props color: color of SVG Icon. Default #DB1920
 * @returns Exclamation JSX SVG Icon
 */
const ExclamationIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px', color = '#DB1920' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.99917 6.75V8.25M8.99917 11.25H9.00667M3.80302 14.25H14.1953C15.35 14.25 16.0717 13 15.4944 12L10.2982 3C9.72086 2 8.27748 2 7.70013 3L2.50398 12C1.92663 13 2.64832 14.25 3.80302 14.25Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExclamationIcon;
