import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * ThreeDots Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @returns ThreeDots JSX SVG Icon
 */
const ThreeDotsIcon: React.FC<IconFunctionType> = ({ className = 'w-[19px] h-[4px]' }) => {
  return (
    <svg className={className} viewBox="0 0 19 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.5" cy="2" r="2" fill="currentColor" />
      <circle cx="9.5" cy="2" r="2" fill="currentColor" />
      <circle cx="16.5" cy="2" r="2" fill="currentColor" />
    </svg>
  );
};

export default ThreeDotsIcon;
