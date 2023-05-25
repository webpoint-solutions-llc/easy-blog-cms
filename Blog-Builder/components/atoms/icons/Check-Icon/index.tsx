import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Check Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[20px] h-[20px])
 * @returns Check JSX SVG Icon
 */
const CheckIcon: React.FC<IconFunctionType> = ({ className = 'w-[20px] h-[20px] text-neutral-600' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.84768 12.9882L4.51445 9.65473L3.33594 10.8332L7.84768 15.3452L17.0143 6.17852L15.8358 5.00001L7.84768 12.9882Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIcon;
