import React from 'react';

import BlogInsights from './Insights';
import OverviewLatestPost from './LatestPosts';
import OverviewCard from '@molecules/OverviewCard';
import OverviewNav from '@organisms/Dashboard/Blogs/Overview/OverviewNav';

import FetchWrapper from '@molecules/FetchWrapper';
import {
  Blog,
  IBlogOverview,
  Insight,
  IOverviewCard,
} from '@particles/responseInterface/blog/blogs.overview.interface';
import useFetchBlogsOverview from '@particles/hooks/dashboard/blog/useFetchBlogsOverview';

/**
 * Design for blog overview
 * @returns Blog overview JSX
 */
const BlogOverview: React.FC = () => {
  const { data: BlogOverviewData, isLoading, isError } = useFetchBlogsOverview();

  return (
    <main className="bg-background-color h-full pb-6">
      <div className="container mx-auto">
        <OverviewNav />
        <FetchWrapper isError={isError} isLoading={isLoading}>
          <div className="grid grid-cols-3 gap-[30px]">
            {BlogOverviewData?.overviewCard.map((cardContent: IOverviewCard, index: number) => (
              <OverviewCard content={cardContent as IOverviewCard} key={`${cardContent.title}-${index}`} />
            ))}
            <div className="col-span-2">
              <OverviewLatestPost latestBlogList={BlogOverviewData?.blogs as IBlogOverview} />
            </div>
            <BlogInsights insights={BlogOverviewData?.insights as Insight[]} />
          </div>
        </FetchWrapper>
      </div>
    </main>
  );
};

export default BlogOverview;
