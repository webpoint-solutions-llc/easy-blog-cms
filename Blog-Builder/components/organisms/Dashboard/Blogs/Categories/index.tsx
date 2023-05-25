import React from 'react';

import { useNavigate } from 'react-router-dom';

import FetchWrapper from '@molecules/FetchWrapper';
import BlogsHeadAddNew from '@molecules/Blogs/BlogsHeadAddNew';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import TableContainer from '@organisms/Dashboard/TableContent/TableContainer';
import TableContentBody from '@organisms/Dashboard/TableContent/TableContentBody';
import { blogCategoriesNavigation } from '@particles/const/blogs/categories/navigation';
import { formatBlogCategoriesContent, heading } from '@particles/const/blogs/categories/table';
import useFetchBlogCategories from '@particles/hooks/dashboard/blogCategory/useFetchBlogCategories';
import { TableControlType } from '@organisms/Dashboard/TableContent/TableContentBody/content.interface';
import useMutationDeleteBlogCategory from '@particles/hooks/dashboard/blogCategory/useMutationDeleteBlogCategory';

const BlogCategories: React.FC = () => {
  const navigation = useNavigate();
  const { data: blogCategoryList, isLoading, isError } = useFetchBlogCategories();
  const { mutate: deleteCategory } = useMutationDeleteBlogCategory();
  const content = formatBlogCategoriesContent(blogCategoryList?.data || [], deleteCategory, isLoading);

  return (
    <main className="container mx-auto py-4">
      <BlogsNavigation content={blogCategoriesNavigation} />
      <div className="mt-10">
        <BlogsHeadAddNew
          heading="Categories"
          onClick={() => {
            navigation('add-new-category');
          }}
          buttonPlaceholder="Add New"
          searchBar={true}
          searchBarPlaceholder="Search Categories"
        />
      </div>
      <div className="mt-6">
        <TableContainer>
          <FetchWrapper isError={isError} isLoading={isLoading} totalData={blogCategoryList?.totalData}>
            <TableContentBody
              tableControlType={TableControlType.button}
              content={content}
              heading={heading}
              includeId={false}
            />
            <TableFooter totalPage={blogCategoryList?.totalPage} />
          </FetchWrapper>
        </TableContainer>
      </div>
    </main>
  );
};

export default BlogCategories;
