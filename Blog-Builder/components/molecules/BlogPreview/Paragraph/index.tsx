import React from 'react';

import clsx from 'clsx';

import BlogParagraphCSS from '@particles/css/blogPreview/paragraph.module.css';

const BlogPreviewParagraph: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={clsx('mt-4', BlogParagraphCSS.paragraphContainer)}
    ></div>
  );
};

export default BlogPreviewParagraph;
