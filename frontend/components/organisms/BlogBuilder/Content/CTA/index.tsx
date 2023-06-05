import React from 'react';

import { IImageSelector } from '..';
import { IBlog } from '@particles/interface/blogEditContent.interface';
import { MediaList } from '@particles/interface/blogContent.interface';

interface IBlogBuilderCTA extends Partial<IBlog> {
  data: MediaList;
  index: number;
  openImageSelector: React.Dispatch<React.SetStateAction<IImageSelector>>;
  previewPage?: boolean;
}

const BlogBuilderCTA: React.FC<Partial<IBlogBuilderCTA>> = ({
  data,
  setContent,
  index,
  openImageSelector,
  previewPage = false,
}) => {
  return (
    <React.Fragment>
      <section
        className="bg-cta-placeholder p-4 rounded-md relative flex items-start justify-between h-[238px]"
        style={
          data && data?.file?.completedUrl
            ? {
                backgroundImage: `url(${data?.file.completedUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
            : {}
        }
      >
        {!previewPage && (
          <div className="flex w-full justify-end">
            <button
              className="bg-link text-white text-caption px-3 py-2 rounded"
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
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default React.memo(BlogBuilderCTA);
