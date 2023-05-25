import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Slider Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[20px] h-[20px])
 * @returns Slider JSX SVG Icon
 */
const SliderIcon: React.FC<IconFunctionType> = ({ className = 'w-[20px] h-[20px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8327 4.16667H18.3327V5.83333H10.8327V4.16667ZM1.66602 5.83333H7.49935V7.5H9.16602V2.5H7.49935V4.16667H1.66602V5.83333ZM7.49935 14.1667H18.3327V15.8333H7.49935V14.1667ZM15.8327 9.16667H18.3327V10.8333H15.8327V9.16667ZM14.166 12.5V7.51H12.4993V9.16667H1.66602V10.8333H12.4993V12.5H14.166ZM5.83268 17.5V12.5H4.16602V14.1667H1.66602V15.8333H4.16602V17.5H5.83268Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SliderIcon;
