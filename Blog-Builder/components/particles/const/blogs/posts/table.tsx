import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

import Button from '@atoms/buttons';
import EyeIcon from '@atoms/icons/Eye-Icon';
import ChatIcon from '@atoms/icons/Chat-Icon';
import TrashIcon from '@atoms/icons/Trash-Icon';
import ShareIcon from '@atoms/icons/Share-Icon';
import ModalDelete from '@molecules/ModalDelete';
import RefreshIcon from '@atoms/icons/Refresh-Icon';
import ChatAltIcon from '@atoms/icons/ChatAlt-Icon';
import PencilAltIcon from '@atoms/icons/Pencil-Alt-Icon';
import ThreeDotsIcon from '@atoms/icons/Three-Dots-Icon';
import { EButtonType } from '@atoms/buttons/button.types';
import { IBlog } from '@particles/responseInterface/blog/blog.list.interface';
import { IThreeDotsOptions } from '@organisms/Dashboard/TableContent/ThreeDotOption';

import LineClampCSS from '@particles/css/blogs/categories.module.css';
import { IBlogContentPost } from '@particles/interface/blogContentPost.interface';
import { IDeleteBlogProps } from '@particles/hooks/dashboard/blog/useMutationDeletePost';

export const heading = (contentType: string) => {
  const head = ['Title', 'Keyword', 'Categories', 'Tags', 'Author'];

  if (contentType === 'published') {
    head.push('Date Published');
  }
  if (contentType === 'drafts') {
    head.push('Moved to draft');
  }
  if (contentType === 'trash') {
    head.push('Moved to trash');
  }

  return head;
};

export const includeId = false;

export const formatBlogsContent = (
  data: IBlog[],
  deletePost: ({ id, deletePermanently }: IDeleteBlogProps) => void,
  moveToDraft: (values: Partial<IBlogContentPost>) => void,
  contentType: string,
  isLoading?: boolean,
) => {
  return isLoading
    ? []
    : data.map((row: IBlog, index) => {
        const blogId = row._id;
        const searchParams = new URLSearchParams();

        searchParams.set('blogId', blogId);

        let details: IThreeDotsOptions[] = [
          {
            value: 'View Post',
            icon: EyeIcon,
            link: `/blog-preview/${row.blog_uuid}/`,
            iconClass: 'w-[18px] h-[18px]',
          },
          {
            value: 'Share Post',
            icon: ShareIcon,
            functionRun: () => {
              // Share post function
            },
            iconClass: 'w-[18px] h-[18px]',
          },
          {
            value: 'Edit',
            icon: PencilAltIcon,
            link: `/blog-builder/${row.blog_uuid}/?type=edit`,
            iconClass: 'w-[18px] h-[18px]',
          },
          {
            value: 'View All Comments',
            icon: ChatAltIcon,
            link: `/dashboard/blogs/posts/comments/?${searchParams.toString()}`,
            iconClass: 'w-[18px] h-[18px]',
          },
          {
            value: 'Move To Draft',
            icon: RefreshIcon,
            functionRun: (toggleModal) => {
              moveToDraft({ blog_uuid: row.blog_uuid, published: false, isDeleted: false });
              // Move to draft function
              toggleModal(false);
            },
            iconClass: 'w-[18px] h-[18px]',
          },
          {
            value: 'Move To Publish',
            icon: RefreshIcon,
            functionRun: (toggleModal) => {
              // Move to publish function
              moveToDraft({ blog_uuid: row.blog_uuid, published: true, action: 'VALIDATE_DRAFT' });
              toggleModal(false);
            },
            iconClass: 'w-[18px] h-[18px]',
          },
          {
            value: 'Move To Trash',
            icon: TrashIcon,
            functionRun: () => {
              // Move to trash function
            },
            Modal: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => {
              // We can put delete modal call here
              // Close modal after work done
              return (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-body1">Would you like to move this post to trash?</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button btnType={EButtonType.outline} onClick={() => closeModal(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        deletePost({ id: row._id });
                        closeModal(false);
                      }}
                    >
                      Move to trash
                    </Button>
                  </div>
                </div>
              );
            },
            iconClass: 'w-[18px] h-[18px] text-error',
          },
        ];

        details = details.filter((value, index) => {
          if (contentType === 'published') {
            return index !== 5;
          }
          if (contentType === 'drafts') {
            return index !== 4;
          }
          if (contentType === 'trash') {
            return !(index === 5 || index === 6);
          }
        });

        if (contentType === 'trash') {
          details.push({
            value: 'Permanently delete',
            icon: TrashIcon,
            functionRun: () => {
              // Move to trash function
            },
            Modal: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => {
              // We can put delete modal call here
              // Close modal after work done
              return (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-body1">Would you like to permanently remove this blog post?</p>
                    <p className="text-caption text-neutral-600">
                      Deleting this would permanently remove the blog and would not be accessible.
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button btnType={EButtonType.outline} onClick={() => closeModal(false)}>
                      Cancel
                    </Button>
                    <Button
                      btnType={EButtonType.none}
                      className="p-3 bg-error text-white"
                      onClick={() => {
                        deletePost({ id: row._id, deletePermanently: true });

                        // Permanently Delete Blog post
                        closeModal(false);
                      }}
                    >
                      Delete Permanently
                    </Button>
                  </div>
                </div>
              );
            },
            iconClass: 'w-[18px] h-[18px] text-error',
          });
        }

        return [
          index + 1,
          <div className="flex gap-3 w-full items-center min-w-[202px] max-w-[202px]" key={`content-${row._id}`}>
            <div className="min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px] rounded-lg overflow-hidden">
              {row?.hero?.thumbnail ? (
                <img
                  src={row.mediaList.find((media) => media._id === row?.hero?.thumbnail)?.file.completedUrl}
                  width={'54px'}
                  height={'54px'}
                  alt="Blog Image"
                  className="object-fill w-full h-full min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px]"
                />
              ) : (
                <div className="min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px] bg-neutral-200 flex items-center justify-center">
                  <ThreeDotsIcon />
                </div>
              )}
            </div>
            <span className={clsx('text-listDetail text-neutral-900 max-w-[220px]', LineClampCSS.lineClamp)}>
              {row?.seoSetting?.title}
            </span>
          </div>,
          <div key={`keyword-${row._id}`} className={clsx('w-[128px]', LineClampCSS.lineClamp)}>
            {row?.seoSetting?.keyword}
          </div>,
          <div key={`categories-${row._id}`} className={clsx('w-[145px] text-center', LineClampCSS.lineClamp)}>
            {Array.isArray(row?.seoSetting?.categories) ? row?.seoSetting?.categories?.map((row) => row.name) : ''}
          </div>,
          <div className={clsx('w-[78px] text-center break-words', LineClampCSS.lineClamp)} key={`tags-${row._id}`}>
            {Array.isArray(row?.seoSetting?.tags) ? row?.seoSetting?.tags?.map((row) => row.name).join(', ') : ''}
          </div>,
          row?.author?.fullName,
          moment(row.published ? row?.lastPublishedDate : row?.lastDraftDate).format('LL'),
          details,
        ];
      });
};

export const content = [
  [
    1,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-1'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'View All Comments',
        icon: ChatIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    2,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-2'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    3,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-3'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    4,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-4'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    5,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-5'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    6,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-6'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    7,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-7'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    8,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-8'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    9,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-9'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
  [
    10,
    <div className="flex gap-3 w-full justify-center items-center max-w-[202px]" key={'content-10'}>
      <img
        src="/components/particles/images/blogs/posts/post-placeholder-blogs.jpg"
        width={52}
        height={52}
        alt="Blog Image"
      />
      <span className="text-listDetail text-neutral-900">The importance of the Work-Life balance</span>
    </div>,
    'health, work, balance',
    ['Healthy Lifestyle', 'Work'],
    'weekly_post',
    'Jenny Wilson',
    'Nov 3, 2022',
    [
      {
        value: 'View Post',
        icon: EyeIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Share Post',
        icon: ShareIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Edit',
        icon: PencilAltIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Draft',
        icon: RefreshIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px]',
      },
      {
        value: 'Move To Trash',
        icon: TrashIcon,
        link: '/',
        iconClass: 'w-[18px] h-[18px] text-error',
      },
    ],
  ],
];
