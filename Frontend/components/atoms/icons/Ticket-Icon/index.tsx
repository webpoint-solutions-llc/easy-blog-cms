import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const TicketIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] text-white' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.25 3.75V5.25M11.25 8.25V9.75M11.25 12.75V14.25M3.75 3.75C2.92157 3.75 2.25 4.42157 2.25 5.25V7.5C3.07843 7.5 3.75 8.17157 3.75 9C3.75 9.82843 3.07843 10.5 2.25 10.5V12.75C2.25 13.5784 2.92157 14.25 3.75 14.25H14.25C15.0784 14.25 15.75 13.5784 15.75 12.75V10.5C14.9216 10.5 14.25 9.82843 14.25 9C14.25 8.17157 14.9216 7.5 15.75 7.5V5.25C15.75 4.42157 15.0784 3.75 14.25 3.75H3.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TicketIcon;
