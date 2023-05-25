import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Download Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[20px] h-[20px])
 * @returns Download JSX SVG Icon
 */
const DownloadIcon: React.FC<IconFunctionType> = ({ className = 'w-[20px] h-[20px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.33398 13.3327L3.33398 14.166C3.33398 15.5467 4.45327 16.666 5.83398 16.666L14.1673 16.666C15.548 16.666 16.6673 15.5467 16.6673 14.166L16.6673 13.3327M13.334 9.99935L10.0007 13.3327M10.0007 13.3327L6.66732 9.99935M10.0007 13.3327L10.0006 3.33268"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadIcon;
