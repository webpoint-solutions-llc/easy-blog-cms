import React, { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import EyeIcon from '@atoms/icons/Eye-Icon';
import LoadingPage from '@templates/LoadingPage';
import InformationCircleIcon from '@atoms/icons/InformationCircle-Icon';
import MediaListCSS from '@particles/css/blogs/media/mediaList.module.css';
import useFetchInfiniteMediaList from '@particles/hooks/dashboard/media/useFetchInfiniteMediaList';
import { IMediaFile, IMediaResponse } from '@particles/responseInterface/media/uploadMedia.interface';

interface IContentProps {
  url: string;
  alt: string;
  type: string;
  id: string;
}

interface IProps {
  setCurrentURL: Dispatch<SetStateAction<string>>;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}

const InfiniteMeidaList = ({ setCurrentURL, setToggleModal }: IProps) => {
  const { ref, inView } = useInView();

  const { data: fetchResult, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchInfiniteMediaList();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading || fetchResult === undefined) return <LoadingPage />;

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {fetchResult?.pages.map((page) => {
          const content: IContentProps[] = page.data.map((value: IMediaFile) => ({
            url: value.file.completedUrl,
            alt: value.file.filename,
            type: value.file.mime,
            id: value._id,
          }));

          return (
            <React.Fragment key={page.nextId}>
              {content &&
                content.map((value, index) => (
                  <div
                    key={`image-${index}`}
                    className={clsx(
                      'aspect-square flex items-center bg-neutral-300 rounded-lg overflow-hidden justify-center relative shadow-card',
                      MediaListCSS.parent,
                    )}
                  >
                    <div className={clsx(MediaListCSS.hoverContent, 'absolute flex flex-col top-4 right-4')}>
                      <div
                        className="bg-opacity-40 bg-neutral-900 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          setToggleModal(true);
                          setCurrentURL(value.url);
                        }}
                      >
                        <EyeIcon className="w-5 h-5" color="white" />
                      </div>
                      <Link to={`/dashboard/blogs/media/attachment-details/${value.id}`}>
                        <div className="bg-opacity-40 bg-neutral-900 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer mt-2">
                          <InformationCircleIcon className="w-5 h-5" color="white" />
                        </div>
                      </Link>
                    </div>
                    <img src={value.url} alt={value.alt} className="rounded-lg" />
                  </div>
                ))}
            </React.Fragment>
          );
        })}
      </section>
      <div className="flex justify-center p-6 text-caption " ref={ref}>
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? '...' : '---End---'}
      </div>
    </>
  );
};

export default InfiniteMeidaList;
