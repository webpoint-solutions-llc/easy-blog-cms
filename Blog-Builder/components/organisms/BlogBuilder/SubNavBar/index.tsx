import React from 'react';

import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';

const BlogBuilderSubNav: React.FC = () => {
  return (
    <section className="w-full bg-neutral-100">
      <div className="container mx-auto flex gap-[6px] py-3 bg-neutral-100 items-center">
        <span className="text-caption text-neutral-600">Home</span>
        <ChevonDownIcon className="w-3 h-3 text-neutral-600 rotate-90" />
        <span className="text-caption text-neutral-900">Blog</span>
      </div>
    </section>
  );
};

export default BlogBuilderSubNav;
