import React from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface ITabs {
  content: {
    name: string;
    link: string;
  }[];
  active: string;
}

const Tabs: React.FC<ITabs> = ({ content, active }) => {
  return (
    <section className="border border-neutral-400 rounded overflow-hidden flex w-fit">
      {content.map((value, index) => (
        <Link to={value.link} key={`tabs-${index}`}>
          <a>
            <div
              className={clsx(
                index !== 0 && 'border-r border-r-neutral-300',
                'px-4 py-[10px] cursor-pointer text-caption hover:bg-neutral-300',
                active.toLowerCase() === value.name.toLowerCase()
                  ? 'bg-neutral-200 text-neutral-900'
                  : 'text-neutral-600',
              )}
            >
              {value.name}
            </div>
          </a>
        </Link>
      ))}
    </section>
  );
};

export default Tabs;
