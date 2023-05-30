import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Document Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @returns Document JSX SVG Icon
 */
const DocumentIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px]' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 15.75H12.75C13.5784 15.75 14.25 15.0784 14.25 14.25V7.06066C14.25 6.86175 14.171 6.67098 14.0303 6.53033L9.96967 2.46967C9.82902 2.32902 9.63825 2.25 9.43934 2.25H5.25C4.42157 2.25 3.75 2.92157 3.75 3.75V12M3.75 15.75L7.40901 12.091M7.40901 12.091C7.81618 12.4982 8.37868 12.75 9 12.75C10.2426 12.75 11.25 11.7426 11.25 10.5C11.25 9.25736 10.2426 8.25 9 8.25C7.75736 8.25 6.75 9.25736 6.75 10.5C6.75 11.1213 7.00184 11.6838 7.40901 12.091Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DocumentIcon;
