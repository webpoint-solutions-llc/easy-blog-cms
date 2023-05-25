import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const GlobeAltIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px]', color = '#25705A' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5M16.5 9C16.5 4.85786 13.1421 1.5 9 1.5M16.5 9H1.5M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9M9 16.5C10.3807 16.5 11.5 13.1421 11.5 9C11.5 4.85786 10.3807 1.5 9 1.5M9 16.5C7.61929 16.5 6.5 13.1421 6.5 9C6.5 4.85786 7.61929 1.5 9 1.5M1.5 9C1.5 4.85786 4.85786 1.5 9 1.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GlobeAltIcon;
