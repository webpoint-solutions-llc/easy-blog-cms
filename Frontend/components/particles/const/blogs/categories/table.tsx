import React from 'react';

import clsx from 'clsx';

import TrashIcon from '@atoms/icons/Trash-Icon';
import PencilIcon from '@atoms/icons/Pencil-Icon';
import CategoriesDelete from '@molecules/CategoriesDelete';
import { IBlogCategory } from '@particles/responseInterface/blog-category/blog-category.list.interface';

import BlogCategoriesCSS from '@particles/css/blogs/categories.module.css';

export const heading = ['Category Name', 'Description', 'Slug', 'Count'];

export const includeId = false;

export const formatBlogCategoriesContent = (data: IBlogCategory[], deleteCategory: any, isLoading?: boolean) =>
  isLoading
    ? []
    : data?.map((row: IBlogCategory, index) => [
        index + 1,
        row.name,
        <span key={'content-value-1'} className={clsx('max-w-[264px]', BlogCategoriesCSS.lineClamp)}>
          {row.description}
        </span>,
        row.slug,
        row.count,
        [
          {
            icon: PencilIcon,
            link: `/dashboard/blogs/categories/${row._id}`,
            params: [],
            view: true,
          },
          {
            icon: TrashIcon,
            view: true,
            link: '/',
            danger: true,
            deleteModal: true,
            Modal: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => {
              return (
                <CategoriesDelete
                  name={row.name}
                  deleteFunction={() => {
                    deleteCategory(row._id);
                  }}
                  closeModal={closeModal}
                />
              );
            },
          },
        ],
      ]);

export const content = [
  [
    1,
    'Information Technology',
    <span key="content-value-1" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    2,
    'Information Technology',
    <span key="content-value-2" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    3,
    'Information Technology',
    <span key="content-value-3" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    4,
    'Information Technology',
    <span key="content-value-4" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    5,
    'Information Technology',
    <span key="content-value-5" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    6,
    'Information Technology',
    <span key="content-value-6" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    7,
    'Information Technology',
    <span key="content-value-7" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    8,
    'Information Technology',
    <span key="content-value-8" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    9,
    'Information Technology',
    <span key="content-value-9" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
  [
    10,
    'Information Technology',
    <span key="content-value-10" className="max-w-[264px]">
      {'Lorem Ipsum is simply dummy text of the printing and typesetting industry...'}
    </span>,
    '/information-technology',
    3,
    [
      {
        icon: PencilIcon,
        link: '/',
        view: true,
      },
      { icon: TrashIcon, view: true, link: '/', danger: true },
    ],
  ],
];
