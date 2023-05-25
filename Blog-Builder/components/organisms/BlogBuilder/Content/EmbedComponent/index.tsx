import Inputs from '@atoms/inputs';
import React from 'react';
import ReactPlayer from 'react-player';

const BlogBuilderEmbed: React.FC<{ data: string }> = ({ data }) => {
  const [link, setLink] = React.useState(data);

  return (
    <section className="w-full flex flex-col gap-2 border border-dashed border-neutral-900 p-4">
      {link.length > 0 && <ReactPlayer url={link} className="w-full text-center rounded-md" width={'100%'} />}
    </section>
  );
};

export default BlogBuilderEmbed;
