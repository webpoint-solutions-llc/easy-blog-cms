import React from 'react';

const BlogPreviewTLTR: React.FC<{ content: string }> = ({ content }) => {
  return (
    <section className="p-6 bg-neutral-100 rounded-lg text-body2 text-neutral-700">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </section>
  );
};

export default BlogPreviewTLTR;
