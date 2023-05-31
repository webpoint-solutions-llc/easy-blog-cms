import React from 'react';
import { useParams } from 'react-router-dom';

import Button from '@atoms/buttons';
import TopButton from '@atoms/topButton';
import LoadingPage from '@templates/LoadingPage';
import InputSection from '@molecules/inputSection';
import BlogBuilderNavBar from '@organisms/BlogBuilder/NavBar';
import BlogBuilderSubNav from '@organisms/BlogBuilder/SubNavBar';
import BlogPreviewUserCard from '@organisms/Blog-Preview/UserCard';
import BlogPreviewHeroSection from '@organisms/Blog-Preview/HeroSection';
import BlogPreviewBlogDetails from '@organisms/Blog-Preview/BlogDetails';
import BlogBuilderInfographics from '@organisms/BlogBuilder/Content/infographics';

import { IBlogContent } from '@particles/interface/blogContent.interface';
import useFetchSingleBlog from '@particles/hooks/dashboard/blog/useFetchSingleBlog';

const BlogBuilderJobPreview: React.FC = () => {
  const { id } = useParams();

  const { data: blogContent, isLoading } = useFetchSingleBlog(id || '');

  const [content, setContent] = React.useState<IBlogContent>({
    body: [
      {
        order: 1,
        type: 'TLTR',
        data: '<b>TLTR: </b>',
      },
    ],
    cta: {
      employee: { link: '', subTitle: '', title: '' },
      employer: { link: '', subTitle: '', title: '' },
      newsLetter: true,
    },
    hero: {
      title: '',
    },
    banner_image: undefined,
    blog_uuid: id as string,
    published: false,
    categories: [''],
    keyword: '',
    meta_description: '',
    slug: '',
    title: '',
    tags: [''],
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
        updatedAt: blogContent.updatedAt,
        mediaList: blogContent.mediaList,
      }));
    }
  }, [blogContent]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="w-full">
      <BlogBuilderNavBar content={content} setContent={setContent} loading={isLoading} />
      <BlogBuilderSubNav />
      <BlogPreviewHeroSection content={content} />
      <div className="container mx-auto">
        <BlogPreviewUserCard content={content} />
      </div>
      <section className="container mx-auto flex gap-[30px]">
        <div className="w-2/3">
          <BlogPreviewBlogDetails content={content} />
        </div>
        <div className="w-1/3 mt-6 relative">
          <div className="sticky top-4 right-0 w-full flex flex-col gap-6">
            {content.cta.employer?.image && (
              <div className="w-full h-[194px] overflow-hidden rounded-lg">
                <img src={content.cta.employer?.image?.file?.completedUrl} className="object-cover" />
              </div>
            )}
            {content.cta.employee?.image && (
              <div className="w-full h-[194px] overflow-hidden rounded-lg">
                <img src={content.cta.employee?.image.file?.completedUrl} className="object-cover" />
              </div>
            )}
            <div className="w-full bg-white rounded-lg shadow-newsLetter p-6 flex flex-col text-center relative">
              <h4 className="text-h4 text-neutral-900">Stay updated</h4>
              <p className="text-body3 text-neutral-700 mt-1">Submit your email to join our newsletter</p>
              <InputSection placeholder="Your email" containerClass="mt-[24px] overflow-hidden" />
              <div className="w-full mt-6 flex justify-center">
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex gap-[30px] container mx-auto">
        <div className="w-2/3 mt-4">
          {typeof content?.infographic !== 'undefined' && (
            <div className="relative">
              <BlogBuilderInfographics image={content.infographic.file?.completedUrl} />
            </div>
          )}
        </div>
        <div className="w-1/3"></div>
      </section>
      <TopButton />
    </main>
  );
};

export default BlogBuilderJobPreview;
