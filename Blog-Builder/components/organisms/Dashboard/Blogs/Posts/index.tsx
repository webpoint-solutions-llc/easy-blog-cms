import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { redirectUser } from './const';
import FetchWrapper from '@molecules/FetchWrapper';
import useGetParams from '@particles/hooks/usetGetParams';
import BlogsHeadAddNew from '@molecules/Blogs/BlogsHeadAddNew';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import useFetchBlogs from '@particles/hooks/dashboard/blog/useFetchBlogs';
import TableContainer from '@organisms/Dashboard/TableContent/TableContainer';
import { formatBlogsContent, heading } from '@particles/const/blogs/posts/table';
import TableHeadContent from '@organisms/Dashboard/TableContent/TableHeadContent';
import TableContentBody from '@organisms/Dashboard/TableContent/TableContentBody';
import useMutationPatchBlog from '@particles/hooks/dashboard/blog/useMutationPatchBlog';
import useMutationDeletePost from '@particles/hooks/dashboard/blog/useMutationDeletePost';
import useMutationBlogExport from '@particles/hooks/dashboard/blog/useMutationBlogsExport';
import { blogPostsNavigation, navigateContent } from '@particles/const/blogs/posts/navigation';
import { TableControlType } from '@organisms/Dashboard/TableContent/TableContentBody/content.interface';

const BlogsPost: React.FC = () => {
  const navigate = useNavigate();

  const contentParam = useGetParams('content') || '';

  const exportBlog = useMutationBlogExport();
  const { mutate: deletePost } = useMutationDeletePost(false, '/dashboard/blogs/posts/?content=trash');
  const { mutate: moveToDraft } = useMutationPatchBlog(true, redirectUser(contentParam));
  const { data: blogList, isLoading, isError } = useFetchBlogs();

  const content = formatBlogsContent(blogList?.data, deletePost, moveToDraft, contentParam, isLoading);

  return (
    <main className="container mx-auto py-4">
      <BlogsNavigation content={blogPostsNavigation} />
      <div className="mt-10">
        <BlogsHeadAddNew
          heading="Posts"
          onClick={() => {
            navigate(`/blog-builder/${uuidv4()}`);
          }}
        />
      </div>
      <div className="mt-6">
        <TableContainer>
          <TableHeadContent
            content={navigateContent}
            inputPlaceholder="Search blogs"
            onExportCSVClick={() => {
              exportBlog.mutate();
            }}
          />

          <FetchWrapper isError={isError} isLoading={isLoading} totalData={blogList?.totalData}>
            <TableContentBody
              tableControlType={TableControlType.tripleDot}
              content={content}
              heading={heading(contentParam)}
              includeId={false}
            />
            <TableFooter totalPage={blogList?.totalPage} />
          </FetchWrapper>
        </TableContainer>
      </div>
    </main>
  );
};

export default BlogsPost;
