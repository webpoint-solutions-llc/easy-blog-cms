import React from 'react';

import clsx from 'clsx';
import { toast } from 'react-toastify';

import Button from '@atoms/buttons';
import CogIcon from '@atoms/icons/Cog-Icon';
import DropDownNavBlogBuilder from './DropDown';
import useGetParams from '@particles/hooks/usetGetParams';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import BlogBuilderNavCSS from '@particles/css/blogbuilder/navbar/navbar.module.css';
import useMutationPatchBlog from '@particles/hooks/dashboard/blog/useMutationPatchBlog';
import { IBlogContentPost } from '@particles/interface/blogContentPost.interface';

interface IBlogBUilderNavBar extends IBlog {
  loading: boolean;
  autoSave?: boolean;
}

const BlogBuilderNavBar: React.FC<IBlogBUilderNavBar> = ({ content, setContent, loading, autoSave = false }) => {
  const [dropDown, setDropDown] = React.useState<boolean>(false);
  const dropDownContainer = React.useRef<HTMLDivElement>(null);
  const [timeout, setTimeoutVal] = React.useState<NodeJS.Timeout>();

  const type = useGetParams('type');

  React.useEffect(() => {
    /**
     * If the dropdown container exists and the target of the event is not a child of the dropdown
     * container, then set the dropdown to false
     * @param {MouseEvent} e - MouseEvent - this is the event that is passed to the function.
     */
    const containerNavCheck = (e: MouseEvent) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(e.target as Node) &&
        (e.target as HTMLElement)?.id.split('-')[0] !== 'react'
      ) {
        setDropDown(false);
      }
    };

    window.addEventListener('click', containerNavCheck, true);

    return () => window.removeEventListener('click', containerNavCheck, true);
  }, []);

  // auto saving - add {published:true} for publishing blog
  const { mutate: createBlog } = useMutationPatchBlog(true, '');
  const { mutate: updateBlog } = useMutationPatchBlog(false);

  const handlePublishBlog = (published?: boolean, button?: boolean) => {
    const mediaList: string[] = [
      content.hero.image?._id,
      content.hero.thumbnail?._id,
      ...content.body.map((value) => {
        if (value.type === 'image' || value.type === 'employer-cta' || value.type === 'employee-cta') {
          return value.data?._id;
        }
      }),
      content.cta.employee?.image?._id,
      content.cta.employer?.image?._id,
      content.infographic?._id,
    ].filter((id) => id !== null);

    const publishContent: IBlogContentPost = {
      blog_uuid: content.blog_uuid,
      hero: {
        title: content.hero.title,
        image: content.hero.image?._id,
        thumbnail: content.hero.thumbnail?._id,
      },
      cta: {
        employee: {
          image: content.cta.employee?.image?._id,
        },
        employer: {
          image: content.cta.employer?.image?._id,
        },
        newsLetter: content.cta.newsLetter,
      },
      content: [
        ...content.body.map((value) => {
          if (value.type === 'image' || value.type === 'employer-cta' || value.type === 'employee-cta') {
            return {
              type: value.type,
              data: value.data?._id,
              order: value.order,
            };
          }

          return value;
        }),
      ],
      categories: content.categories,
      tags: content.tags,
      keyword: content.keyword,
      meta_description: content.meta_description,
      slug: content.keyword.replaceAll(' ', '-'),
      title: content.title,
      infographic: content.infographic?._id,
      mediaList: mediaList,
      published: !!published,
    };

    if (button) {
      if (
        publishContent.title.length === 0 ||
        publishContent.keyword.length === 0 ||
        publishContent.meta_description.length === 0 ||
        publishContent.tags.length === 0 ||
        publishContent.categories?.length === 0
      ) {
        toast('Please fill the SEO Settings', { type: 'error' });
        setTimeout(() => setDropDown(true), 200);

        return;
      }

      if (published) {
        if (
          !(
            publishContent.content.length > 1 &&
            publishContent.hero.image &&
            publishContent.hero.thumbnail &&
            (publishContent.cta.employee?.image || publishContent.cta.employer?.image) &&
            publishContent.infographic
          )
        ) {
          toast(
            'You need to have certain value at body, hero image, thumbnail, atLeast one of side cta and infographics image',
            { type: 'error' },
          );

          return;
        }
      }
      createBlog(publishContent); // This shows toast
    } else {
      if (
        publishContent.content.length > 1 &&
        publishContent.hero.image &&
        publishContent.hero.thumbnail &&
        (publishContent.cta.employee?.image || publishContent.cta.employer?.image) &&
        publishContent.infographic &&
        !(
          publishContent.title.length === 0 ||
          publishContent.keyword.length === 0 ||
          publishContent.meta_description.length === 0 ||
          publishContent.tags.length === 0 ||
          publishContent.categories?.length === 0
        )
      ) {
        updateBlog(publishContent); // This doesn't show the toast
      }
    }
  };

  const updateBlogFun = () => {
    handlePublishBlog(false);
    setTimeoutVal(undefined);
  };

  React.useEffect(() => {
    if (!loading && autoSave) {
      if (timeout) {
        clearTimeout(timeout);
      }
      setTimeoutVal(setTimeout(updateBlogFun, 2000));
    }
  }, [content, loading]);

  return (
    <div className="">
      {/* sticky top-0 left-0 bg-white z-50 inside if sticky is required above */}
      <header className={clsx('container', BlogBuilderNavCSS.navContainer)}>
        <div>{/** Logo should be here */}</div>
        <nav className={BlogBuilderNavCSS.navigateContainer}>
          <span
            className={clsx(BlogBuilderNavCSS.nav, 'cursor-pointer')}
            onClick={() => handlePublishBlog(false, true)}
          >
            Save As Draft
          </span>
          <Button className={BlogBuilderNavCSS.publishButton} onClick={() => handlePublishBlog(true, true)}>
            {type && type === 'edit' ? 'Update' : 'Publish'}
          </Button>
          <div className={BlogBuilderNavCSS.blogOptionsContainer} ref={dropDownContainer}>
            <div className={BlogBuilderNavCSS.blogOptionToggle} onClick={() => setDropDown(true)}>
              <CogIcon className={BlogBuilderNavCSS.blogOptionIcon} />
            </div>
            {dropDown && (
              <DropDownNavBlogBuilder closeDropDownFunc={setDropDown} setContent={setContent} content={content} />
            )}
          </div>
        </nav>
        {timeout && (
          <div className="fixed bottom-4 right-4 bg-primary-30 z-50 text-neutral-900 p-2 rounded">Saving...</div>
        )}
      </header>
    </div>
  );
};

export default BlogBuilderNavBar;
