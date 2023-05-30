import React, { FC, ReactNode, useEffect, useRef } from 'react';

import clsx from 'clsx';

import Heading from '@atoms/headers';
import { EHeadingSize } from '@atoms/headers/heading.types';
import AnimatedPlusIcon from '@atoms/icons/Animated-Plus-Icon';

/**
 * FAQ card component
 * @props header <string> - Question to be added in FAQ section
 * @props children <string> - Answer to be added in FAQ section
 * @props index <number> - Question index number (used to expand only if one component is clicked)
 * @props maxData <number> - Maximum number of data. It is used to remove border bottom of last component when it is opened
 * @props activeIndex <number|null> - Currently opened question. If non of the questions are opened then value will be null.
 * @props setActiveIndex <React.Dispatch<React.SetStateAction<number|null>>> - Dispatches event if current event if clicked
 *
 * @returns Custom FAQ card compoent as JSX.Element.
 */
const FAQCard: FC<{
  header: string;
  children: ReactNode;
  index: number;
  maxData: number;
  activeIndex: number | null;
  isBlogFaq?: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}> = ({ header, children, isBlogFaq, index, maxData, activeIndex, setActiveIndex }) => {
  const elementHeight = useRef<HTMLInputElement>(null);
  const actualHeight = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (elementHeight.current) {
      if (elementHeight.current.clientHeight) {
        elementHeight.current.style.height = '0';
      } else if (activeIndex === index) {
        elementHeight.current.style.height = actualHeight.current ? `${actualHeight.current?.clientHeight}px` : '';
      }
    }
  }, [activeIndex, index]);

  return (
    <section
      className={clsx(
        'pb-6',
        maxData - 1 === index && activeIndex === index ? 'border-0' : 'border-b border-b-border-faq',
        index > 0 ? 'mt-4 lg:mt-6' : 'mt-4 lg:mt-0',
      )}
    >
      <div
        className="flex w-full md:justify-between items-center cursor-pointer"
        onClick={() =>
          setActiveIndex((prevValue) => {
            if (prevValue === null || prevValue !== index) {
              return index;
            } else {
              return null;
            }
          })
        }
      >
        <Heading
          size={isBlogFaq ? EHeadingSize.h2 : EHeadingSize.h4}
          color="#262626"
          className={clsx(
            'w-11/12 md:w-auto',
            isBlogFaq ? 'text-h2-important' : 'text-h4v2',
            !isBlogFaq && ' md:max-w-[550px]',
          )}
        >
          {header}
        </Heading>
        <div className="w-1/12 md:w-auto flex justify-end">
          <AnimatedPlusIcon
            color="#262626"
            className={clsx('w-4 h-4 md:w-[18.4px] md:h-[18.4px]')}
            iconClass={clsx(
              'transition-all duration-[40ms] lg:duration-500 ease-in-out',
              activeIndex === index ? 'rotate-90 translate-x-full' : 'rotate-0',
            )}
          />
        </div>
      </div>

      <div
        className={clsx(
          'flex flex-col text-body2 leading-7 text-neutral-700 overflow-hidden transition-height duration-[40ms] lg:duration-500 ease-in-out',
          activeIndex === index && `mt-4`,
        )}
        ref={elementHeight}
      >
        <div ref={actualHeight}>{children}</div>
      </div>
    </section>
  );
};

export default FAQCard;
