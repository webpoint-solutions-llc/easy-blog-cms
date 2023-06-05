import React from 'react';

import clsx from 'clsx';

import { IconFunctionType } from '../iconFunctionType.interface';

const MagnifyGlassIcon: React.FC<IconFunctionType> = ({ className, color = '#A5A5A5' }) => {
  return (
    <svg
      className={clsx(className ? className : 'w-[18px] h-[18px]')}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 15.75L11.25 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.60051 12.75 2.25 10.3995 2.25 7.5C2.25 4.60051 4.60051 2.25 7.5 2.25C10.3995 2.25 12.75 4.60051 12.75 7.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MagnifyGlassIcon;
