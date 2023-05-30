import React from 'react';

import YouTube from 'react-youtube';

import Inputs from '@atoms/inputs';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import { youtubeRegex } from '@particles/const/validationRegex';

interface IBlogBUilderVideoLink extends Partial<IBlog> {
  data: string;
}

const BlogBuilderVideoLink: React.FC<IBlogBUilderVideoLink> = ({ data, setContent }) => {
  const [link, setLink] = React.useState('');

  const links = link.split('=');

  const videoId = links[links.length - 1];

  return (
    <section className="w-full flex flex-col gap-2 border border-dashed border-neutral-900 p-4">
      <Inputs
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter Youtube link"
        status={link.length > 0}
        error={youtubeRegex.test(link) ? 'Invalid youtube link' : undefined}
      />
      {videoId.length > 0 && (
        <YouTube
          videoId={videoId}
          opts={{
            width: '100%',
          }}
          className="w-full max-h-[387px] text-center rounded-md"
        />
      )}
    </section>
  );
};

export default BlogBuilderVideoLink;
