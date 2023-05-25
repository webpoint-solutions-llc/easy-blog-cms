import React from 'react';

import overviewCardCSS from '@particles/css/blogs/overview/overviewCard.module.css';
import { IOverviewCard } from '@particles/responseInterface/blog/blogs.overview.interface';

/**
 * overview cards
 * @props content:- title: string;
  count: string;
  todayCount: string;
  todayDetail: string;
 * @returns overview cards
 */
const OverviewCard: React.FC<{ content: IOverviewCard }> = ({ content }) => {
  return (
    <section className={overviewCardCSS.cardContainer}>
      <span className="text-captionBold text-neutral-900">{content.title}</span>
      <h2 className="text-h2 text-neutral-900">{content.count}</h2>
      <p className="flex item-center gap-[6px]">
        <span className="text-bodysmall text-neutral-700">{content.todayCount}</span>
        <span className="text-dot-color">&#x2022;</span>
        <span className="text-excerpt2 text-neutral-600">{content.todayDetail}</span>
      </p>
    </section>
  );
};

export default OverviewCard;
