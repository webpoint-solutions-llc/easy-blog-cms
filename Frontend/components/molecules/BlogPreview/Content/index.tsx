import React from 'react';

import ReactPlayer from 'react-player';

const BlogPreviewContent: React.FC<{ link: string }> = ({ link }) => {
  return (
    <div className="mt-4">
      <ReactPlayer url={link} className="w-full text-center rounded-md" width={'100%'} />
    </div>
  );
};

export default BlogPreviewContent;
