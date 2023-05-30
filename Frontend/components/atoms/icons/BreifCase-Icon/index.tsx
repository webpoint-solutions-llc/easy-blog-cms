import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const BreifCaseIcon: React.FC<IconFunctionType> = ({ className = 'w-[49px] h-12 text-neutral-600' }) => {
  return (
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M42.5 26.5109C36.9414 28.7609 30.8654 30 24.5 30C18.1346 30 12.0586 28.7609 6.5 26.5109M32.5 12V8C32.5 5.79086 30.7091 4 28.5 4H20.5C18.2909 4 16.5 5.79086 16.5 8V12M24.5 24H24.52M10.5 40H38.5C40.7091 40 42.5 38.2091 42.5 36V16C42.5 13.7909 40.7091 12 38.5 12H10.5C8.29086 12 6.5 13.7909 6.5 16V36C6.5 38.2091 8.29086 40 10.5 40Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BreifCaseIcon;
