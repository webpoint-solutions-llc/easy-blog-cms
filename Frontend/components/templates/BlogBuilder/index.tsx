import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import TLTRText from '@organisms/BlogBuilder/TLTR';
import BlogBuilderNavBar from '@organisms/BlogBuilder/NavBar';
import BlogBuilderContent from '@organisms/BlogBuilder/Content';
import BlogBuilderSubNav from '@organisms/BlogBuilder/SubNavBar';
import BlogBuilderCTAContent from '@organisms/BlogBuilder/CTAContent';
import BlogBuilderHeroSection from '@organisms/BlogBuilder/HeroSection';
import { IBlogContent } from '@particles/interface/blogContent.interface';
import useFetchSingleBlog from '@particles/hooks/dashboard/blog/useFetchSingleBlog';

const BlogBuilderTemplate: React.FC = () => {
  const { id } = useParams();

  const { data: blogContent, isLoading } = useFetchSingleBlog(id || '');

  const [content, setContent] = useState<IBlogContent>({
    body: [
      {
        order: 1,
        type: 'TLTR',
        data: '<b>TLTR: </b>',
      },
    ],
    cta: {
      employee: { image: undefined },
      employer: { image: undefined },
      newsLetter: true,
    },
    hero: {
      title: '',
    },
    blog_uuid: id as string,
    published: false,
    categories: [],
    keyword: '',
    meta_description: '',
    slug: '',
    title: '',
    tags: [],
  });

  React.useEffect(() => {
    if (blogContent) {
      setContent((prevVal) => ({
        ...prevVal,
        body: [
          ...blogContent.content.map((value) => {
            if (value.type === 'image' || value.type === 'employer-cta' || value.type === 'employee-cta') {
              return {
                data: blogContent.mediaList.find((index) => index._id === value.data),
                order: value.order,
                type: value.type,
              };
            }

            return value;
          }),
        ],
        hero: {
          title: blogContent.hero.title,
          image: blogContent.mediaList.find((index) => index._id === blogContent.hero.image),
          thumbnail: blogContent.mediaList.find((index) => index._id === blogContent.hero.thumbnail),
        },
        cta: {
          employee: {
            image: blogContent.mediaList.find((index) => {
              if (blogContent.cta.employee && index._id === blogContent.cta.employee.image) {
                return index;
              }
            }),
          },
          employer: {
            image: blogContent.mediaList.find((index) => {
              if (blogContent.cta.employer && index._id === blogContent.cta.employer.image) {
                return index;
              }
            }),
          },
          newsLetter: blogContent.cta.newsLetter,
        },
        published: blogContent.published,
        categories: blogContent.seoSetting.categories.map((value) => value._id),
        keyword: blogContent.seoSetting.keyword,
        infographic: blogContent.mediaList.find((index) => index._id === blogContent.infographic),
        tags: blogContent.seoSetting.tags.map((value) => value.name),
        meta_description: blogContent.seoSetting.meta_description,
        title: blogContent.seoSetting.title,
      }));
    }
  }, [blogContent]);

  return (
    <main className="w-full flex flex-col">
      <BlogBuilderNavBar content={content} setContent={setContent} loading={isLoading} autoSave={true} />
      <BlogBuilderSubNav />
      <BlogBuilderHeroSection content={content} setContent={setContent} />
      <section className="container mx-auto my-16 flex gap-[30px]">
        <div className="w-8/12">
          <TLTRText content={content} setContent={setContent} />

          <BlogBuilderContent content={content} setContent={setContent} />
        </div>
        <div className="w-4/12">
          <BlogBuilderCTAContent content={content} setContent={setContent} />
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default BlogBuilderTemplate;
