import React from 'react';

import InsightsProgress from '@molecules/InsightsProgress';
import InsightsCSS from '@particles/css/blogs/overview/insights.module.css';
import { Insight } from '@particles/responseInterface/blog/blogs.overview.interface';

type Iprops = {
  insights: Insight[];
};

const BlogInsights: React.FC<Iprops> = ({ insights }) => {
  return (
    <div className="w-full">
      <section className={InsightsCSS.insightsContainer}>
        <article className="flex w-full justify-between items-end">
          <h4 className="text-h4 text-neutral-900">Insights</h4>
        </article>
        <div className="mt-6 flex flex-col gap-6">
          {insights.map((value: Insight, index: number) => (
            <InsightsProgress key={`${value.title}-${index}`} content={value} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogInsights;
