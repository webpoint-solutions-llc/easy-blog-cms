import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * OfficeBuilding Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @returns OfficeBuilding JSX SVG Icon
 */
const OfficeBuildingIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px] text-white' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.25 15.75V3.75C14.25 2.92157 13.5784 2.25 12.75 2.25H5.25C4.42157 2.25 3.75 2.92157 3.75 3.75V15.75M14.25 15.75L15.75 15.75M14.25 15.75H10.5M3.75 15.75L2.25 15.75M3.75 15.75H7.5M6.75 5.24998H7.5M6.75 8.24998H7.5M10.5 5.24998H11.25M10.5 8.24998H11.25M7.5 15.75V12C7.5 11.5858 7.83579 11.25 8.25 11.25H9.75C10.1642 11.25 10.5 11.5858 10.5 12V15.75M7.5 15.75H10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OfficeBuildingIcon;
