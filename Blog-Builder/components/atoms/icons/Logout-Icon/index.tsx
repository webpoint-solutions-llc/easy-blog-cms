import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Logout Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @props color: color of SVG Icon. Default #262626
 * @returns Logout Icon in JSX SVG format
 */
const LogoutIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px]', color = '#262626' }) => {
  return (
    <svg className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.75 12.5L15.75 9.5M15.75 9.5L12.75 6.5M15.75 9.5L5.25 9.5M9.75 12.5V13.25C9.75 14.4926 8.74264 15.5 7.5 15.5H4.5C3.25736 15.5 2.25 14.4926 2.25 13.25V5.75C2.25 4.50736 3.25736 3.5 4.5 3.5H7.5C8.74264 3.5 9.75 4.50736 9.75 5.75V6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutIcon;
