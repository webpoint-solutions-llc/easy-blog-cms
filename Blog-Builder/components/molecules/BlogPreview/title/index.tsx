import React from 'react';

import { TagToString } from '@particles/helper/tagStringToString';

const BlogPreviewTitle: React.FC<{ content: string }> = ({ content }) => {
  const textContent = TagToString(content);

  return (
    <div
      className="text-h2 text-neutral-900 mt-14"
      dangerouslySetInnerHTML={{ __html: content }}
      id={textContent?.replaceAll(' ', '-')}
    ></div>
  );
};

export default BlogPreviewTitle;
