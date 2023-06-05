import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Button from '@atoms/buttons';
import { visibility } from './const';
import InputSection from '@molecules/inputSection';
import ReactSelect from '@atoms/react-select/ReactSelect';
import { EButtonType } from '@atoms/buttons/button.types';
import { IBlog } from '@particles/interface/blogEditContent.interface';
import BlogBuilderNavCSS from '@particles/css/blogbuilder/navbar/navbar.module.css';
import useFetchAllBlogCategories from '@particles/hooks/dashboard/blogCategory/useFetchAllBlogCategories';
import { IBlogContent } from '@particles/interface/blogContent.interface';

interface IDropDownNavBlogBuilder {
  closeDropDownFunc: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<IBlogContent>>;
  content: IBlogContent;
}

const DropDownNavBlogBuilder: React.FC<IDropDownNavBlogBuilder> = ({ closeDropDownFunc, setContent, content }) => {
  const [tagOptions, setTagOptions] = React.useState<{ label: string; value: string }[]>([]);
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const { data: blogCategoryList } = useFetchAllBlogCategories();

  const categoryOptions = blogCategoryList?.data.map((row) => {
    return { label: row?.name, value: row?._id };
  });
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      visibility: 'Public',
      url: '',
      // author: '',
      title: content?.title || '',
      keyword: content?.keyword || '',
      meta_description: content?.meta_description || '',
      tags: content?.tags || [],
      categories: content?.categories || [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      keyword: Yup.string().required(),
      meta_description: Yup.string().required(),
      tags: Yup.array().min(1, 'At least one tag needs to be selected!').required(),
      categories: Yup.array().min(1, 'At least one category needs to be selected!').required(),
    }),
    onSubmit: async (value) => {
      setContent((prevValue) => {
        return {
          ...prevValue,
          ...value,
          categories: value?.categories.length === 0 ? [''] : value?.categories,
          tags: value?.tags ? value?.tags : [],
        };
      });
    },
  });

  React.useEffect(() => {
    if (formik.values['tags'].length > 0) {
      setTagOptions(
        formik.values['tags'].map((value) => {
          return {
            label: value,
            value: value,
          };
        }),
      );
    }
  }, [formik.values['tags']]);

  React.useEffect(() => {
    if (submitStatus && Object.keys(formik.errors).length === 0) {
      closeDropDownFunc(false);
    }
  }, [content, submitStatus]);

  React.useEffect(() => {
    formik.setFieldValue('url', `https://talentpoint.io/blogs/${formik.values['keyword'].replaceAll(' ', '-')}`);
  }, [formik.values['keyword']]);

  return (
    <form onSubmit={formik.handleSubmit} className={BlogBuilderNavCSS.dropDownContainer}>
      <h5 className="text-h5 text-neutral-900">Summary</h5>
      <div className="flex gap-14">
        <span className="text-navText text-neutral-900">Publish</span>
        <span className="text-caption text-link">{formattedDate}</span>
      </div>
      <ReactSelect
        label="Visibility"
        labelClassName={BlogBuilderNavCSS.dropDownInputLabel}
        containerClassName={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['visibility']}
        options={visibility}
        onValueChange={(value) => formik.setFieldValue('visibility', value)}
        onBlur={() => formik.setFieldTouched('visibility')}
        errorToolTip={formik.touched['visibility']}
        downArrow={true}
        error={formik.errors['visibility']}
      />
      <InputSection
        label={'URL'}
        labelClass={BlogBuilderNavCSS.dropDownInputLabel}
        containerClass={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['url']}
        name="url"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        bottomError={false}
        status={formik.touched['url']}
        disabled
        error={formik.touched['url'] ? formik.errors['url'] : undefined}
      />
      {/* <ReactSelect
        label="Author *"
        labelClassName={BlogBuilderNavCSS.dropDownInputLabel}
        containerClassName={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['author']}
        onValueChange={(value) => formik.setFieldValue('author', value)}
        onBlur={() => formik.setFieldTouched('author')}
        errorToolTip={formik.touched['author']}
        downArrow={true}
        error={formik.errors['author']}
      /> */}
      <InputSection
        label={'Title *'}
        labelClass={BlogBuilderNavCSS.dropDownInputLabel}
        containerClass={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['title']}
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        bottomError={false}
        status={formik.touched['title']}
        error={formik.touched['title'] ? formik.errors['title'] : undefined}
        placeholder={'Blog title goes here'}
      />
      <InputSection
        label={'Keyword *'}
        labelClass={BlogBuilderNavCSS.dropDownInputLabel}
        containerClass={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['keyword']}
        name="keyword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        bottomError={false}
        status={formik.touched['keyword']}
        error={formik.touched['keyword'] ? formik.errors['keyword'] : undefined}
        placeholder={'Keyword'}
      />
      <InputSection
        label={'Meta Description *'}
        labelClass={BlogBuilderNavCSS.dropDownInputLabel}
        containerClass={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['meta_description']}
        name="meta_description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        bottomError={false}
        status={formik.touched['meta_description']}
        error={formik.touched['meta_description'] ? formik.errors['meta_description'] : undefined}
        placeholder={'Meta Description'}
      />
      <ReactSelect
        label="Tags *"
        labelClassName={BlogBuilderNavCSS.dropDownInputLabel}
        containerClassName={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['tags']}
        onValueChange={(value) => {
          formik.setFieldValue('tags', value);
        }}
        onBlur={() => formik.setFieldTouched('tags')}
        errorToolTip={formik.touched['tags']}
        downArrow={true}
        maxHeight="auto"
        options={tagOptions}
        isMulti
        error={formik.touched['tags'] ? (formik.errors['tags'] as string) : undefined}
        customSelect={true}
      />
      <ReactSelect
        label="Categories *"
        labelClassName={BlogBuilderNavCSS.dropDownInputLabel}
        containerClassName={BlogBuilderNavCSS.dropDownInputContainer}
        value={formik.values['categories']}
        options={categoryOptions}
        onValueChange={(value) => {
          formik.setFieldValue('categories', value);
        }}
        onBlur={() => formik.setFieldTouched('categories')}
        errorToolTip={formik.touched['categories']}
        downArrow={true}
        maxHeight="auto"
        isMulti
        error={formik.touched['categories'] ? (formik.errors['categories'] as string) : undefined}
      />
      <div className="w-full flex justify-end gap-4">
        <Button type="button" btnType={EButtonType.outline} onClick={() => closeDropDownFunc(false)}>
          Cancel
        </Button>
        <Button type="submit" onClick={() => setSubmitStatus(true)}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default DropDownNavBlogBuilder;
