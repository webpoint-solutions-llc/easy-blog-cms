import React from 'react';

import clsx from 'clsx';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Infomation Circle Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-4)
 * @props color: color of SVG Icon. Default #262626
 * @returns Information circle JSX SVG format
 */
const InformationCircleIcon: React.FC<IconFunctionType> = ({ className, color = '#262626' }) => {
  return (
    <svg className={clsx('w-4', className)} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.75 12.5H9V9.5H8.25M9 6.5H9.0075M15.75 9.5C15.75 13.2279 12.7279 16.25 9 16.25C5.27208 16.25 2.25 13.2279 2.25 9.5C2.25 5.77208 5.27208 2.75 9 2.75C12.7279 2.75 15.75 5.77208 15.75 9.5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InformationCircleIcon;
