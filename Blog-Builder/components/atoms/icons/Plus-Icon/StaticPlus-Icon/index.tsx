import React from 'react';

import { IconFunctionType } from '@atoms/icons/iconFunctionType.interface';

/**
 * Generates Static Plus Icon
 * @props className: class for the SVG icon component
 * @returns Static plus icon
 */
const StaticPlusIcon: React.FC<IconFunctionType> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 5V10M10 10V15M10 10H15M10 10L5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StaticPlusIcon;
