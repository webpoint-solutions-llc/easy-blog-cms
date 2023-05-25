import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const ExternalLinkIcon: React.FC<IconFunctionType> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.334 8.00016H8.00065C6.52789 8.00016 5.33398 9.19407 5.33398 10.6668V24.0002C5.33398 25.4729 6.52789 26.6668 8.00065 26.6668H21.334C22.8067 26.6668 24.0006 25.4729 24.0006 24.0002V18.6668M18.6673 5.3335H26.6673M26.6673 5.3335V13.3335M26.6673 5.3335L13.334 18.6668"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExternalLinkIcon;
