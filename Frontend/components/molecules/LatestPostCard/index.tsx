import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import EyeIcon from '@atoms/icons/Eye-Icon';
import UploadIcon from '@atoms/icons/Upload-Icon';

import ThreeDotsIcon from '@atoms/icons/Three-Dots-Icon';
import { IBlogContent } from '@particles/interface/blogContent.interface';
import { Blog } from '@particles/responseInterface/blog/blogs.overview.interface';
import LatestPostCardCSS from '@particles/css/blogs/overview/latestPostsCard.module.css';
import { IBlogContentPost } from '@particles/interface/blogContentPost.interface';
import { IBlog } from '@particles/responseInterface/blog/blog.list.interface';

/**
 * Generates small section of latest post cards
 * @props content:- image: string;
  title: string;
  writer: string;
  views: string | number;
  publishDate: string;
  viewLink: string;
  published: boolean;
 * @returns Generates small section of latest post cards
 */
const LatestPostCard: React.FC<{ content: IBlog; publishPost: (values: Partial<IBlogContentPost>) => void }> = ({
  content,
  publishPost,
}) => {
  return (
    <article className={LatestPostCardCSS.cardContainer}>
      <div className="w-1/2 flex gap-3 items-center">
        {content?.hero?.thumbnail ? (
          <img
            src={content.mediaList.find((media) => media?._id === content?.hero?.thumbnail)?.file.completedUrl}
            width={'54px'}
            height={'54px'}
            alt="Blog Image"
            className="object-fill w-full h-full rounded-lg min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px]"
          />
        ) : (
          <div className="min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px] bg-neutral-200 flex items-center justify-center">
            <ThreeDotsIcon />
          </div>
        )}
        <div className="flex flex-col gap-[3px] max-w-[219px]">
          <h6 className="text-listDetail text-neutral-900">{content?.seoSetting?.title}</h6>
          <p className="flex items-center gap-[10px] text-excerpt2 text-neutral-700">
            <span>{content?.author?.fullName}</span>
            <span className="text-dot-color">&#x2022;</span>
            <span>{content.count} views</span>
          </p>
        </div>
      </div>
      <div className="w-1/4">
        <span className="text-bodysmall text-neutral-700">
          {moment(content.published ? content?.lastPublishedDate : content?.lastDraftDate).format('LL')}
        </span>
      </div>
      <div className="w-1/4 flex">
        <a href={'/blog-preview/' + content.blog_uuid + '/'}>
          <div className={clsx(LatestPostCardCSS.contentAction, 'border-r border-r-dash-color')}>
            <EyeIcon className="w-[18px] h-[18px] text-neutral-900" />
            <span className="text-caption text-neutral-900">View</span>
          </div>
        </a>
        <div
          className={clsx(
            LatestPostCardCSS.contentAction,
            content?.published ? 'text-neutral-400' : 'text-neutral-900 cursor-pointer',
          )}
          onClick={() =>
            !content.published &&
            publishPost({ blog_uuid: content?.blog_uuid, published: true, action: 'VALIDATE_DRAFT' })
          }
        >
          <UploadIcon className="w-[18px] h-[18px]" />
          <span className="text-caption">Publish</span>
        </div>
      </div>
    </article>
  );
};

export default LatestPostCard;
