import React from 'react';

import clsx from 'clsx';

function PlusIcon({ className, color = 'white' }: { className?: string; color?: string }) {
  return (
    <svg className={clsx('w-4 lg:w-5', className)} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5002 3.3335V16.6668M17.1668 10.0002L3.8335 10.0002"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PlusIcon;
