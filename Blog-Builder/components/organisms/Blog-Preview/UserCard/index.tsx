import React from 'react';

import UserIcon from '@atoms/icons/User-Icon';
import CalendarIcon from '@atoms/icons/Calendar-Icon';

import { IBlog } from '@particles/interface/blogEditContent.interface';

const BlogPreviewUserCard: React.FC<Partial<IBlog>> = ({ content }) => {
  return (
    <section className="flex gap-4 mt-6">
      <div className="flex gap-2 items-center">
        <UserIcon className="w-[18px] text-neutral-900 items-center" />
        <span className="text-body3 text-neutral-900">{'Admin'}</span>
      </div>
      <div className="flex items-center text-neutral-400">&#x2022;</div>
      <div className="flex gap-2 items-center">
        <CalendarIcon className="w-[18px] text-neutral-900 items-center" />
        <span className="text-body3 text-neutral-900">
          {content &&
            new Date(content.updatedAt || '').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
        </span>
      </div>
    </section>
  );
};

export default BlogPreviewUserCard;
