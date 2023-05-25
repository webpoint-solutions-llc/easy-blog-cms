import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * List Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[24px] h-[24px])
 * @returns List JSX SVG Icon
 */
const ListIcon: React.FC<IconFunctionType> = ({ className = 'w-[24px] h-[24px]' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ListIcon;
