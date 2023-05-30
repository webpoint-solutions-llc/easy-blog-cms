import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Cog Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @props color: color of SVG Icon. Default #262626
 * @returns Cog JSX SVG Icon
 */
const CogIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px]', color = '#262626' }) => {
  return (
    <svg className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.74347 3.73798C8.06327 2.42067 9.93673 2.42067 10.2565 3.73798C10.4631 4.58895 11.4381 4.99278 12.1859 4.53714C13.3435 3.83179 14.6682 5.15653 13.9629 6.31414C13.5072 7.06194 13.9111 8.03688 14.762 8.24347C16.0793 8.56327 16.0793 10.4367 14.762 10.7565C13.9111 10.9631 13.5072 11.9381 13.9629 12.6859C14.6682 13.8435 13.3435 15.1682 12.1859 14.4629C11.4381 14.0072 10.4631 14.4111 10.2565 15.262C9.93673 16.5793 8.06327 16.5793 7.74347 15.262C7.53688 14.4111 6.56194 14.0072 5.81414 14.4629C4.65653 15.1682 3.33179 13.8435 4.03714 12.6859C4.49278 11.9381 4.08895 10.9631 3.23798 10.7565C1.92067 10.4367 1.92067 8.56327 3.23798 8.24347C4.08895 8.03688 4.49278 7.06194 4.03714 6.31414C3.33179 5.15653 4.65653 3.83179 5.81414 4.53714C6.56194 4.99278 7.53688 4.58895 7.74347 3.73798Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 9.5C11.25 10.7426 10.2426 11.75 9 11.75C7.75736 11.75 6.75 10.7426 6.75 9.5C6.75 8.25736 7.75736 7.25 9 7.25C10.2426 7.25 11.25 8.25736 11.25 9.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CogIcon;
