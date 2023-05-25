import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const DocumentDownloadIcon: React.FC<IconFunctionType> = ({ className = 'w-8 h-8 text-neutral-900' }) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9993 13.3333V21.3333M15.9993 21.3333L11.9993 17.3333M15.9993 21.3333L19.9993 17.3333M22.666 28H9.33268C7.85992 28 6.66602 26.8061 6.66602 25.3333V6.66667C6.66602 5.19391 7.85992 4 9.33268 4H16.7804C17.134 4 17.4732 4.14048 17.7232 4.39052L24.9422 11.6095C25.1922 11.8595 25.3327 12.1987 25.3327 12.5523V25.3333C25.3327 26.8061 24.1388 28 22.666 28Z"
        stroke="#262626"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DocumentDownloadIcon;
