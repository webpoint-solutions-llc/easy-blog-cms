import React from 'react';

import clsx from 'clsx';
import { Insight } from '@particles/responseInterface/blog/blogs.overview.interface';

/**
 * 
 * @props content: percent: string;
  title: string;
  value: string;
 * @returns Insigths with progress bar
 */
const InsightsProgress: React.FC<{ content: Insight }> = ({ content }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between w-full items-center">
        <span className="text-caption text-neutral-700">{content.title}</span>
        <span className="text-bodysmall font-bold text-neutral-900">{content.value}</span>
      </div>
      <div className="w-fullh-[6px] rounded-[80px] bg-progress">
        <div
          className={clsx('h-[6px] rounded-[80px] bg-primary-40 hover:bg-primary-80')}
          style={{ width: content.percent }}
        />
      </div>
    </div>
  );
};

export default InsightsProgress;
