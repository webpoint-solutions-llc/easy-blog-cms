import React from 'react';

import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import InputSection from '@molecules/inputSection';
import useMutationPatchMedia from '@particles/hooks/dashboard/media/useMutationPatchMedia';

interface IMediaForm {
  title: string | undefined;
  description: string | undefined;
  altText: string | undefined;
  seoCode: string | undefined;
  fileUrl: string | undefined;
}

const MediaForm: React.FC<IMediaForm> = ({ altText, description, fileUrl, seoCode, title }) => {
  const [copyURL, setCopyURL] = React.useState(false);

  const { mutate: updateMedia, isLoading } = useMutationPatchMedia();
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || '',
      description: description || '',
      altText: altText || '',
      seoCode: seoCode || '',
      fileUrl: fileUrl || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required!'),
    }),
    onSubmit: async (value) => {
      const payload = {
        file: {
          title: value.title,
          description: value.description,
          alt: value.altText,
          seoCode: value.seoCode,
          completedUrl: altText,
        },
      };

      updateMedia({ id: id || '', payload });
    },
  });

  React.useEffect(() => {
    if (copyURL) {
      setTimeout(() => {
        setCopyURL(false);
      }, 3000);
    }
  }, [copyURL]);

  return (
    <form onSubmit={formik.handleSubmit} className="mt-[42px] flex flex-col gap-6">
      <InputSection
        label={'Title'}
        labelClass="text-body3 text-neutral-900 opacity-70"
        containerClass="flex flex-col gap-[6px]"
        value={formik.values['title']}
        onChange={formik.handleChange}
        name="title"
        onBlur={formik.handleBlur}
        status={formik.touched['title']}
        error={formik.touched['title'] ? formik.errors['title'] : undefined}
        bottomError={false}
      />
      <div className="flex flex-col gap-[6px]">
        <label className="text-body3 text-neutral-900 opacity-70">Description</label>
        <textarea
          name="description"
          value={formik.values['description']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="min-h-[120px] resize-none w-full px-4 py-[10px] rounded border border-normal-input"
        ></textarea>
      </div>
      <InputSection
        label={'Alternative text'}
        labelClass="text-body3 text-neutral-900 opacity-70"
        containerClass="flex flex-col gap-[6px]"
        value={formik.values['altText']}
        onChange={formik.handleChange}
        name="altText"
        onBlur={formik.handleBlur}
        status={formik.touched['altText']}
        error={formik.touched['altText'] ? formik.errors['altText'] : undefined}
        bottomError={false}
      />
      {/* Temporary removal! */}
      {/* <InputSection
        label={'Code For SEO'}
        labelClass="text-body3 text-neutral-900 opacity-70"
        containerClass="flex flex-col gap-[6px]"
        name="seoCode"
        value={formik.values['seoCode']}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        status={formik.touched['seoCode']}
        error={formik.touched['seoCode'] ? formik.errors['seoCode'] : undefined}
        bottomError={false}
        placeholder="Enter a code for SEO"
      /> */}
      <div className="flex flex-col gap-[6px]">
        <label className="text-body3 text-neutral-900 opacity-70">File URL</label>
        <div className="flex">
          <Inputs
            value={formik.values['fileUrl']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched['fileUrl']}
            disabled
            error={formik.touched['fileUrl'] ? formik.errors['fileUrl'] : undefined}
            className="overflow-hidden w-full rounded-r-none border-r-0"
          />
          <div
            className="px-[18px] py-[11.5px] text-caption min-w-fit bg-neutral-200 cursor-pointer border border-normal-input rounded-r border-l"
            onClick={() => {
              if (!copyURL) {
                setCopyURL(true);
                navigator.clipboard.writeText(formik.values['fileUrl']);
              }
            }}
          >
            {copyURL ? 'Copied Link' : 'Copy Link'}
          </div>
        </div>
      </div>
      <div className="flex">
        <Button className="py-3 w-[120px]">Save</Button>
      </div>
    </form>
  );
};

export default MediaForm;
