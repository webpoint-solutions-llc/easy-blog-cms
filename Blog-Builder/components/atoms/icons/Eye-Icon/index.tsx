import React from 'react';

import clsx from 'clsx';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Eye Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-3 lg:w-5)
 * @props color: color of SVG Icon. Default #262626
 * @returns Eye JSX SVG Icon
 */
const EyeIcon: React.FC<IconFunctionType> = ({ className, color = '#5D4D8C' }) => {
  return (
    <svg
      className={clsx(className ? className : 'w-4 lg:w-5')}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 9.99984C12.5 11.3805 11.3808 12.4998 10 12.4998C8.61933 12.4998 7.50004 11.3805 7.50004 9.99984C7.50004 8.61913 8.61933 7.49984 10 7.49984C11.3808 7.49984 12.5 8.61913 12.5 9.99984Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.04858 9.99981C3.11048 6.6189 6.26905 4.1665 10.0004 4.1665C13.7318 4.1665 16.8904 6.61893 17.9522 9.99987C16.8904 13.3808 13.7318 15.8332 10.0004 15.8332C6.26905 15.8332 3.11046 13.3807 2.04858 9.99981Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeIcon;
