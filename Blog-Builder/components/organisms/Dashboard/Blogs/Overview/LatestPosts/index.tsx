import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import LatestPostCard from '../../../../../molecules/LatestPostCard';

import useMutationPatchBlog from '@particles/hooks/dashboard/blog/useMutationPatchBlog';
import overviewLatestPostCSS from '@particles/css/blogs/overview/latestPosts.module.css';
import { IBlogOverview } from '@particles/responseInterface/blog/blogs.overview.interface';

type IProps = {
  latestBlogList: IBlogOverview;
};
/**
 * Latests posts available
 * @returns Latests posts available
 */
const OverviewLatestPost: React.FC<IProps> = ({ latestBlogList }) => {
  const navigate = useNavigate();
  const { mutate: publishPost } = useMutationPatchBlog(true);

  return (
    <section className={overviewLatestPostCSS.latestPostsContainer}>
      <article className="w-full flex justify-between items-center">
        <h4 className="text-h4 text-neutral-900">Latest Blog Posts</h4>
        <Button
          className="px-3 py-[11px]"
          onClick={() => {
            navigate(`/blog-builder/${uuidv4()}`);
          }}
        >
          <span className={overviewLatestPostCSS.buttonTextContainer}>
            <StaticPlusIcon />
            Create New
          </span>
        </Button>
      </article>
      <div className="flex flex-col">
        {latestBlogList?.data?.map((blogs, index) => (
          <LatestPostCard publishPost={publishPost} content={blogs} key={`${blogs.seoSetting.title}-${index}`} />
        ))}
      </div>
      <div>
        <Link
          to="/dashboard/blogs/posts/?content=published&pageNo=1&search="
          className="text-link text-excerpt2 font-bold"
        >
          See All Blogs ({latestBlogList.total})
        </Link>
      </div>
    </section>
  );
};

export default OverviewLatestPost;
