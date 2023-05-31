import React from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import ChevonDownIcon from '@atoms/icons/ChevronDownIcon';

interface IBreadcrumbs {
  content: {
    title: string;
    link: string;
  }[];
}

const Breadcrumbs: React.FC<IBreadcrumbs> = ({ content }) => {
  return (
    <section className="flex gap-[6px] items-center">
      {content.map((value, index) => (
        <React.Fragment key={`breadcrumb-${index}`}>
          <Link to={value.link}>
            <a>
              <div
                className={clsx('text-caption', index !== content.length - 1 ? 'text-neutral-600' : 'text-neutral-900')}
              >
                {value.title}
              </div>
            </a>
          </Link>
          {index !== content.length - 1 && (
            <ChevonDownIcon className="w-4 text-neutral-500 rotate-90" color="#A5A5A5" />
          )}
        </React.Fragment>
      ))}
    </section>
  );
};

export default Breadcrumbs;
