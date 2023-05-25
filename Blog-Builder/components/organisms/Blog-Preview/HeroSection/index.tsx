import React from 'react';

import clsx from 'clsx';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import BlogHeroCSS from '@particles/css/blogbuilder/herosection/hero.module.css';

const BlogPreviewHeroSection: React.FC<Partial<IBlog>> = ({ content }) => {
  return (
    <section
      className={clsx(
        'w-full h-[400px] flex items-center justify-center flex-col gap-14 backReference',
        BlogHeroCSS.backgroundHero,
      )}
      style={
        content?.hero?.image?.file?.completedUrl
          ? {
              backgroundImage: `url(${content.hero.image.file.completedUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      <h1
        className="text-h1 text-white max-w-[844px] text-center"
        dangerouslySetInnerHTML={{ __html: content?.hero.title || '' }}
      ></h1>
    </section>
  );
};

export default BlogPreviewHeroSection;
