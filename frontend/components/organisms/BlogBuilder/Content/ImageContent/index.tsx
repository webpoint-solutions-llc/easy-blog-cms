import React from 'react';

import ImageSelector from '@organisms/BlogBuilder/imageSelector';

import { IImageSelector } from '..';
import { IBlog } from '@particles/interface/blogEditContent.interface';
import { MediaList } from '@particles/interface/blogContent.interface';

interface IBlogBuilderImage extends Partial<IBlog> {
  index: number;
  openImageSelector: React.Dispatch<React.SetStateAction<IImageSelector>>;
}

const BlogBuilderImage: React.FC<IBlogBuilderImage> = ({ index, setContent, content, openImageSelector }) => {
  return (
    <section
      className="bg-image-placeholder shadow-card w-full h-[387px] rounded-lg flex items-center justify-center relative"
      style={
        content?.body?.[index]?.data?.file?.completedUrl && {
          backgroundImage: `url(${content?.body[index].data?.file?.completedUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }
      }
    >
      <button
        className="bg-link text-white text-caption rounded px-3 py-2"
        onClick={() => {
          openImageSelector &&
            openImageSelector({
              index: index || 1,
              status: true,
              function: (file: MediaList) => {
                if (setContent && index) {
                  setContent((prevValue) => {
                    const updatedBody = [...prevValue.body];
                    updatedBody[index] = {
                      ...prevValue.body[index],
                      data: { ...file },
                    };

                    return {
                      ...prevValue,
                      body: updatedBody,
                    };
                  });
                }
              },
            });
        }}
      >
        Replace Image
      </button>
    </section>
  );
};

export default BlogBuilderImage;
