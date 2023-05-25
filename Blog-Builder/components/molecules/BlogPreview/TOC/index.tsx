import React from 'react';

import { IBlogBody } from '@particles/interface/blogContent.interface';
import { TagToString } from '@particles/helper/tagStringToString';

const BlogPreviewTOC: React.FC<{ content: IBlogBody[] }> = ({ content }) => {
  const title = content.filter((value) => value.type === 'title');

  return (
    <section className="mt-8">
      <h2 className="text-h3 text-neutral-900">In this blog</h2>
      <ul className="list-disc text-excerpt font-medium ml-4 marker:text-primary-70 text-primary-70 flex flex-col gap-2 mt-4">
        {title.map((value, index) => {
          return (
            <li key={`TOC-${index}`}>
              <a
                dangerouslySetInnerHTML={{ __html: value.data }}
                href={`#${TagToString(value.data)?.replaceAll(' ', '-')}`}
              ></a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BlogPreviewTOC;
