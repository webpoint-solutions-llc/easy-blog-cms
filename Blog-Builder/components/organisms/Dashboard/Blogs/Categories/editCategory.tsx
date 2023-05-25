import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import ArrowLeftIcon from '@atoms/icons/Arrow-Left-Icon';
import { EButtonType } from '@atoms/buttons/button.types';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import { blogCategoriesAddNavigation } from '@particles/const/blogs/categories/navigation';
import { IBlogCategory } from '@particles/hooks/dashboard/blogCategory/useMutationPostBlogCategory';
import useFetchSingleBlogCategory from '@particles/hooks/dashboard/blogCategory/useFetchSingleBlogCategory';
import useMutationPatchBlogCategory from '@particles/hooks/dashboard/blogCategory/useMutationPatchBlogCategory';

const EditCategory: React.FC = () => {
  const { id } = useParams();

  const { data: blogCategory, isLoading, isError } = useFetchSingleBlogCategory(id as string);
  const { mutate: updateBlogCategory } = useMutationPatchBlogCategory();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: blogCategory?.name || '',
      slug: blogCategory?.slug || '',
      description: blogCategory?.description || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      slug: Yup.string()
        .matches(/^[^A-Z\s]+$/, 'Sentence must not contain uppercase letters or Spaces')
        .required(),
      description: Yup.string().required(),
    }),
    onSubmit: (values: IBlogCategory) => {
      updateBlogCategory({ id, values });
    },
  });

  if (isLoading) return <>Loading</>;
  if (isError) return <>Loading</>;

  return (
    <main className="container mx-auto py-4">
      <BlogsNavigation content={blogCategoriesAddNavigation(false)} />
      <Link to="/dashboard/blogs/categories">
        <div className="w-8 h-8 rounded-full border border-neutral-900 flex items-center justify-center mt-10">
          <ArrowLeftIcon />
        </div>
      </Link>
      <h3 className="text-h3 text-neutral-900 mt-6">Edit category</h3>

      <form className="mt-10 flex flex-col gap-10" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-[6px]">
          <label className="text-body3 text-neutral-900">Category Name</label>
          <Inputs
            status={true}
            className="max-w-[662px] max-h-[43px]"
            name="name"
            value={formik.values['name']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched['name'] ? formik.errors['name'] : undefined}
          />
          <span className="text-caption text-neutral-700">
            The name of the category goes here, for example: Health, Information Technology
          </span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <label className="text-body3 text-neutral-900">Slug</label>
          <Inputs
            status={true}
            className="max-w-[662px] max-h-[43px]"
            value={formik.values['slug']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="slug"
            error={formik.touched['slug'] ? formik.errors['slug'] : undefined}
          />
          <span className="text-caption text-neutral-700">
            The “slug” is a URL-friendly version of the name. No capital letters or spaces between words allowed.
          </span>
        </div>
        <div className="flex flex-col gap-[6px] pb-8 border-b border-b-neutral-300">
          <label className="text-body3 text-neutral-900">Category Description</label>
          <textarea
            className="max-w-[662px] h-[120px] resize-none border border-hero-text rounded px-4 py-[10px]"
            value={formik.values['description']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
            placeholder="Brief description regarding the category"
          />
          <span className="text-caption text-neutral-700">Include some description about the category</span>
        </div>
        <div className="flex gap-4">
          <Link to="/dashboard/blogs/categories">
            <Button btnType={EButtonType.outline} type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Update Category</Button>
        </div>
      </form>
    </main>
  );
};

export default EditCategory;
