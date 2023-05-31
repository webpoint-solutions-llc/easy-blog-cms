import React, { useState } from 'react';

import clsx from 'clsx';
import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';

interface ICustomDropDown {
  content: {
    label: string | JSX.Element;
    onClick: () => void;
  }[];
  dangerLast?: boolean;
  currentValue: string;
}

const CustomDropDown: React.FC<ICustomDropDown> = ({ content, dangerLast = true, currentValue }) => {
  const [toggleDropDown, setDropDown] = useState(false);
  const dropDownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    /**
     * This function checks if a click event occurred outside of a dropdown element and sets the
     * dropdown state to false if it did.
     * @param {MouseEvent} e - MouseEvent
     */
    const checkClickOutsideDropDown = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setDropDown(false);
      }
    };

    window.addEventListener('click', checkClickOutsideDropDown);

    return () => window.removeEventListener('click', checkClickOutsideDropDown);
  }, []);

  return (
    <section className="relative w-[140px]" ref={dropDownRef}>
      <div
        className="flex rounded w-[140px] py-[10px] px-4 border border-neutral-300 justify-between items-center"
        onClick={() => setDropDown((prevVal) => !prevVal)}
      >
        <span>{currentValue}</span>
        <ChevonDownIcon className="w-4 h-4 text-neutral-900 rotate-180" />
      </div>
      {toggleDropDown && (
        <div className="flex flex-col w-[140px] z-10 bg-white absolute top-full right-0 rounded overflow-hidden">
          {content.map((value, index) => (
            <div
              key={`custom-${index}`}
              className={clsx(
                'py-[10px] px-4 w-full cursor-pointer text-neutral-900 text-captionSpc',
                currentValue === value.label && 'bg-primary-50',
                dangerLast && index === content.length - 1 && 'text-error',
              )}
              onClick={() => {
                value.onClick();
              }}
            >
              {value.label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CustomDropDown;
