import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const MailIcon: React.FC<IconFunctionType> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 6.66797L9.0755 11.0516C9.63533 11.4249 10.3647 11.4249 10.9245 11.0516L17.5 6.66797M4.16667 15.8346H15.8333C16.7538 15.8346 17.5 15.0884 17.5 14.168V5.83464C17.5 4.91416 16.7538 4.16797 15.8333 4.16797H4.16667C3.24619 4.16797 2.5 4.91416 2.5 5.83464V14.168C2.5 15.0884 3.24619 15.8346 4.16667 15.8346Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MailIcon;
