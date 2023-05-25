import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const PaperClipIcon: React.FC<IconFunctionType> = ({
  className = 'w-8 h-8 text-neutral-200',
  color = 'currentColor',
}) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.2275 9.33333L11.4464 18.1144C10.405 19.1558 10.405 20.8442 11.4464 21.8856C12.4878 22.927 14.1763 22.927 15.2177 21.8856L23.7699 13.1046C25.8527 11.0218 25.8527 7.64489 23.7699 5.5621C21.6871 3.4793 18.3103 3.4793 16.2275 5.5621L7.67518 14.3431C4.55098 17.4673 4.55098 22.5327 7.67518 25.6569C10.7994 28.7811 15.8647 28.7811 18.9889 25.6569L27.332 17.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PaperClipIcon;
