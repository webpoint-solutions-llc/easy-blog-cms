import React from 'react';

import clsx from 'clsx';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Eye Slash Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-4 lg:w-5)
 * @props color: color of SVG Icon. Default #5f4d8c
 * @returns
 */
const EyeSlashIcon: React.FC<IconFunctionType> = ({ className, color = '#5D4D8C' }) => {
  return (
    <svg
      className={clsx(className ? className : 'w-4 lg:w-5')}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.50004 2.5L5.49101 5.49097M17.5 17.5L14.5094 14.5093M11.5624 15.6872C11.0565 15.7831 10.5343 15.8333 10.0004 15.8333C6.26905 15.8333 3.11046 13.3809 2.04858 9.99997C2.33767 9.07958 2.78213 8.22801 3.35124 7.47598M8.23227 8.23223C8.68468 7.77982 9.30968 7.5 10 7.5C11.3808 7.5 12.5 8.61929 12.5 10C12.5 10.6904 12.2202 11.3154 11.7678 11.7678M8.23227 8.23223L11.7678 11.7678M8.23227 8.23223L5.49101 5.49097M11.7678 11.7678L5.49101 5.49097M11.7678 11.7678L14.5094 14.5093M5.49101 5.49097C6.79086 4.65295 8.33884 4.16667 10.0004 4.16667C13.7318 4.16667 16.8904 6.61909 17.9522 10C17.3632 11.8756 16.1288 13.4654 14.5094 14.5093"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeSlashIcon;
