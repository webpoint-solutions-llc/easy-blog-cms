import React from 'react';

import { MediaList } from '@particles/interface/blogContent.interface';

const BlogPreviewImage: React.FC<{ file: MediaList }> = ({ file }) => {
  return (
    <section className="h-[387px] rounded-lg relative overflow-hidden mt-8">
      <img src={file?.file?.completedUrl || ''} alt={file?.file?.filename} className="object-cover h-auto" />
    </section>
  );
};

export default BlogPreviewImage;
