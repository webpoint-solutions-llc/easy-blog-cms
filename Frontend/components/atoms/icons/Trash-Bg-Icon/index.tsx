import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Trash Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @returns Trash JSX SVG Icon
 */
const TrashBgIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px]' }) => {
  return (
    <svg className={className} viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28.5" cy="28" r="28" fill="#DB1920" fill-opacity="0.1" />
      <path
        d="M39.584 20.7083L38.3191 38.4161C38.2101 39.9424 36.9401 41.125 35.4099 41.125H23.3414C21.8112 41.125 20.5412 39.9424 20.4322 38.4161L19.1673 20.7083M26.459 26.5417V35.2917M32.2923 26.5417V35.2917M33.7507 20.7083V16.3333C33.7507 15.5279 33.0977 14.875 32.2923 14.875H26.459C25.6536 14.875 25.0007 15.5279 25.0007 16.3333V20.7083M17.709 20.7083H41.0423"
        stroke="#DB1920"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default TrashBgIcon;
