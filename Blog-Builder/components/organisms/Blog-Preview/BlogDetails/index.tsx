import React from 'react';

import BlogPreviewTOC from '@molecules/BlogPreview/TOC';
import BlogPreviewFAQ from '@molecules/BlogPreview/FAQ';
import BlogPreviewTLTR from '@molecules/BlogPreview/TLTR';
import BlogPreviewTitle from '@molecules/BlogPreview/title';
import BlogPreviewImage from '@molecules/BlogPreview/Image';
import BlogPreviewContent from '@molecules/BlogPreview/Content';
import BlogBuilderCTA from '@organisms/BlogBuilder/Content/CTA';
import BlogPreviewParagraph from '@molecules/BlogPreview/Paragraph';

import { IBlog } from '@particles/interface/blogEditContent.interface';

const BlogPreviewBlogDetails: React.FC<Partial<IBlog>> = ({ content }) => {
  const tldr = content?.body?.[0]?.data;

  const initialParagraph = content?.body?.[1];

  const blogContentData = content?.body?.slice(2);

  return (
    <main className="w-full my-[22px]">
      {tldr && <BlogPreviewTLTR content={tldr as string} />}
      {initialParagraph && <BlogPreviewParagraph content={initialParagraph.data} />}
      {blogContentData && blogContentData.length > 0 && <BlogPreviewTOC content={blogContentData} />}
      {blogContentData &&
        blogContentData.length > 0 &&
        blogContentData.map((data, index) => {
          if (data.type === 'paragraph') {
            return <BlogPreviewParagraph key={`blogPreview-${index}`} content={data.data} />;
          }
          if (data.type === 'title') {
            return <BlogPreviewTitle key={`blogPreview-${index}`} content={data.data} />;
          }
          if (data.type === 'image' && data.data) {
            return <BlogPreviewImage key={`blogPreview-${index}`} file={data.data} />;
          }
          if (data.type === 'embed') {
            return <BlogPreviewContent key={`blogPreview-${index}`} link={data.data} />;
          }
          if ((data.type === 'employer-cta' || data.type === 'employee-cta') && data.data) {
            return (
              <div key={`blogPreview-${index}`} className="mt-14">
                <BlogBuilderCTA data={data.data} previewPage={true} />
              </div>
            );
          }
          if (data.type === 'faq') {
            return <BlogPreviewFAQ key={`blogPreview-${index}`} data={data.data} />;
          }
        })}
    </main>
  );
};

export default BlogPreviewBlogDetails;
