import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

import EyeIcon from '@atoms/icons/Eye-Icon';
import FetchWrapper from '@molecules/FetchWrapper';
import MediaForm from '@molecules/Media/Media-Form';
import ImagePreview from '@molecules/ImagePreviewImage';
import ArrowLeftIcon from '@atoms/icons/Arrow-Left-Icon';
import MediaDetails from '@molecules/Media/Media-Details';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import useFetchSingleMedia from '@particles/hooks/dashboard/media/useFetchSingleMedia';

import { AttachmentBreadcrumbs } from './const';

import MediaCSS from '@particles/css/blogs/media/mediaList.module.css';

const MediaAttachmentDetails: React.FC = () => {
  const { id } = useParams();

  const [toggleModal, setToggleModal] = React.useState(false);

  const { data: media, isLoading, isError } = useFetchSingleMedia(id || '');

  return (
    <FetchWrapper isLoading={isLoading} isError={isError}>
      <main className="px-10 py-4">
        <BlogsNavigation content={AttachmentBreadcrumbs(id ? parseInt(id) : 0)} />
        <div className="mt-10 flex items-center gap-8">
          <Link to="/dashboard/blogs/media/">
            <div className="w-8 h-8 rounded-full border border-neutral-900 flex items-center justify-center">
              <ArrowLeftIcon />
            </div>
          </Link>
          <h1 className="text-h3 text-neutral-900">Attachment details</h1>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className={clsx('col-span-7 relative', MediaCSS.parent)}>
            <img
              src={media?.file.completedUrl || '/talentpoint-icon.png'}
              className={clsx('object-contain w-full', MediaCSS.blurBackground)}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={clsx(
                  MediaCSS.hoverContent,
                  'w-12 aspect-square rounded-full bg-neutral-900 bg-opacity-40 flex items-center justify-center hover:cursor-pointer',
                )}
                onClick={() => {
                  setToggleModal(true);
                }}
              >
                <EyeIcon color="#fff" />
              </div>
            </div>
          </div>
          <div className="col-span-5">
            <div className="w-full p-6 rounded-lg">
              <MediaDetails
                dimension={`${media?.file?.dimension?.height} x ${media?.file?.dimension?.width} pixels`}
                mime={media?.file.mime || ''}
                name={media?.file.filename || ''}
                size={`${media?.file.size} KB`}
                uploadedOn={moment(media?.updatedAt).format('LL')}
              />
              <MediaForm
                title={media?.file?.title || ''}
                altText={media?.file?.alt || ''}
                description={media?.file?.description || ''}
                fileUrl={media?.file?.completedUrl || ''}
                seoCode={media?.file?.seoCode || ''}
              />
            </div>
          </div>
        </div>
        {toggleModal && (
          <ImagePreview toggleModal={setToggleModal} url={media?.file.completedUrl || '/talentpoint-icon.png'} />
        )}
      </main>
    </FetchWrapper>
  );
};

export default MediaAttachmentDetails;
