import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * CloudUpload Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[48px] h-[48px])
 * @returns CloudUpload JSX SVG Icon
 */
const CloudUploadIcon: React.FC<IconFunctionType> = ({ className = 'w-[48px] h-[48px]' }) => {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 32C9.58172 32 6 28.4183 6 24C6 20.1859 8.66913 16.9952 12.2414 16.1939C12.0834 15.4879 12 14.7537 12 14C12 8.47715 16.4772 4 22 4C26.8386 4 30.8746 7.4365 31.8004 12.002C31.8668 12.0007 31.9333 12 32 12C37.5228 12 42 16.4772 42 22C42 26.8379 38.5645 30.8734 34 31.8M30 26L24 20M24 20L18 26M24 20L24 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloudUploadIcon;
