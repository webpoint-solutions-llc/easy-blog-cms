import React from 'react';

import clsx from 'clsx';

import ImageSelector from '../imageSelector';
import ReactQuillEditor from '@atoms/editor';
import RefreshIcon from '@atoms/icons/Refresh-Icon';
import PhotographIcon from '@atoms/icons/Photograph-Icon';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import BlogHeroCSS from '@particles/css/blogbuilder/herosection/hero.module.css';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

const BlogBuilderHeroSection: React.FC<IBlog> = ({ content, setContent }) => {
  const [thumbnailSelector, setThumbnailSelector] = React.useState(false);
  const [backgroundImageSelector, setBackgroundImageSelector] = React.useState(false);

  return (
    <section
      className={clsx('w-full h-[400px] flex items-center justify-center flex-col gap-14', BlogHeroCSS.backgroundHero)}
      style={
        content.hero?.image?.file?.completedUrl
          ? {
              backgroundImage: `url(${content.hero.image.file.completedUrl})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      <ReactQuillEditor
        type={'heading'}
        initialValue={content.hero.title}
        setCurrentValue={(value) => {
          setContent((prevValue) => {
            const currentHero = prevValue?.hero;

            return {
              ...prevValue,
              hero: {
                ...currentHero,
                title: value,
              },
            };
          });
        }}
      />
      <div className="flex gap-4">
        <button
          className="px-3 py-[11px] bg-link rounded-[4px] flex items-center gap-2"
          onClick={() => setBackgroundImageSelector(true)}
        >
          <RefreshIcon className="w-[18px] text-white" />
          <span className="text-caption text-white">Replace Banner Image</span>
        </button>
        <div className="relative">
          <button
            className="px-3 py-[11px] bg-link rounded-[4px] flex items-center gap-2"
            onClick={() => setThumbnailSelector(true)}
          >
            <PhotographIcon />
            <span className="text-caption text-white">Featured Image</span>
          </button>
          <div className="absolute top-1/2 left-[110%] -translate-y-1/2">
            <div className="text-center whitespace-nowrap">
              {!content.hero?.thumbnail?.file?.completedUrl ? (
                <>
                  <span className="py-2 px-4 bg-neutral-900 text-white rounded text-caption">
                    Click here to upload thumbnail!
                  </span>
                  <div className="absolute w-3 h-3 bg-neutral-900 rotate-45 top-1/2 -left-1 -translate-y-1/2"></div>
                </>
              ) : (
                <>
                  <div className="w-[88px] aspect-square rounded-lg bg-white relative p-[3px] z-20 flex">
                    <img src={content.hero.thumbnail.file.completedUrl} className={'object-contain w-full h-full'} />
                    <div
                      className="absolute -top-2 -right-2 rounded-full bg-error cursor-pointer"
                      onClick={() => {
                        setContent((prevVal) => ({
                          ...prevVal,
                          hero: {
                            ...prevVal.hero,
                            thumbnail: undefined,
                          },
                        }));
                      }}
                    >
                      <StaticPlusIcon className="w-4 rotate-45 text-white" />
                    </div>
                  </div>
                  <div className="absolute w-3 h-3 bg-white rotate-45 top-1/2 -left-1 -translate-y-1/2"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {backgroundImageSelector && (
        <ImageSelector
          toggleImageSelector={setBackgroundImageSelector}
          contentSet={(file) => {
            setContent((prevVal) => ({
              ...prevVal,
              hero: {
                ...prevVal.hero,
                image: file,
              },
            }));
            setBackgroundImageSelector(false);
          }}
        />
      )}
      {thumbnailSelector && (
        <ImageSelector
          toggleImageSelector={setThumbnailSelector}
          contentSet={(file) => {
            setContent((prevVal) => ({
              ...prevVal,
              hero: {
                ...prevVal.hero,
                thumbnail: file,
              },
            }));
            setThumbnailSelector(false);
          }}
        />
      )}
    </section>
  );
};

export default BlogBuilderHeroSection;
