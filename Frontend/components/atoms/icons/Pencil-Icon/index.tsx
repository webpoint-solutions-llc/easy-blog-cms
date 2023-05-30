import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Pencil Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @returns Pencil JSX SVG Icon
 */
const PencilIcon: React.FC<IconFunctionType> = ({ className = 'w-[20px] h-[20px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.8898 3.11019C16.0762 2.2966 14.7571 2.2966 13.9435 3.11019L2.5 14.5537V17.5296H5.41667L16.8898 6.05647C17.7034 5.24288 17.7034 3.92379 16.8898 3.11019Z"
        fill="white"
      />
      <path
        d="M12.6935 4.36019L15.6398 7.30647M13.9435 3.11019C14.7571 2.2966 16.0762 2.2966 16.8898 3.11019C17.7034 3.92379 17.7034 5.24288 16.8898 6.05647L5.41667 17.5296H2.5V14.5537L13.9435 3.11019Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilIcon;
