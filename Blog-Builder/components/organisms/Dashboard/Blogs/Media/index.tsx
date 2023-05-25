import React from 'react';

import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@atoms/buttons';
import TablularMediaList from './TablularMediaList';
import InfiniteMeidaList from './InifinateMediaList';
import ImagePreview from '@molecules/ImagePreviewImage';
import CloudUploadIcon from '@atoms/icons/CloudUpload-Icon';
import BlogsHeadAddNew from '@molecules/Blogs/BlogsHeadAddNew';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import TableContainer from '@organisms/Dashboard/TableContent/TableContainer';
import { blogMediaNavigation } from '@particles/const/blogs/media/navigation';
import TableHeadContent from '@organisms/Dashboard/TableContent/TableHeadContent';
import useUploadMediaMigration from '@particles/hooks/dashboard/media/uploadMediaPost';

import { Response } from '@particles/responseInterface/main';

const BlogMedia: React.FC = () => {
  const [addContent, setAddContent] = React.useState<boolean>(false);
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
  const [currentURL, setCurrentURL] = React.useState<string>('');
  const [tabluarView, setTabularView] = React.useState<boolean>(false);
  const [currentViewContent, setCurrentViewContent] = React.useState<number | null>(null);

  const queryClient = useQueryClient();

  const { postUploadData, error: uploadFileError, result: uploadFileResult } = useUploadMediaMigration();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'video/mp4': ['.mp4'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxSize: 1000000,
  });

  /**
   * To upload file so drop
   */
  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles;

      postUploadData(file[0]);
    }
  }, [acceptedFiles]);

  React.useEffect(() => {
    if (uploadFileError) {
      const errorToDisplay = (uploadFileError?.response?.data as Response<void>)?.message;

      toast.error(errorToDisplay || '', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
    if (uploadFileResult) {
      queryClient.invalidateQueries({ queryKey: ['media.list'] });

      toast.success('File has been uploaded!', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  }, [uploadFileResult, uploadFileError]);

  return (
    <main className="container mx-auto py-4">
      <BlogsNavigation content={blogMediaNavigation} />
      <div className="mt-10">
        <BlogsHeadAddNew
          heading="Media library"
          onClick={() => {
            setAddContent((prevValue) => !prevValue);
          }}
          buttonPlaceholder="Add New"
        />
      </div>
      <div className="mt-6">
        <TableContainer>
          <TableHeadContent inputPlaceholder="Search Media" exportActive={false} setState={setTabularView} />
          {addContent && (
            <div className="container mx-auto my-4">
              <div
                {...getRootProps({
                  className: 'flex flex-col bg-white border border-dashed border-neutral-400 py-8 lg:py-16',
                })}
              >
                <div className="flex flex-col items-center justify-center gap-3 lg:gap-5">
                  <CloudUploadIcon />

                  <div className="flex flex-col gap-2">
                    <h5 className="text-h5 text-neutral-900">Drag and Drop your files here</h5>
                    <span className="text-excerpt2 text-neutral-600">Files supported: JPG, JPEG, PNG</span>
                  </div>
                  <span className="font-medium self-center text-[#675F75]">or</span>

                  <Button
                    className="max-w-[120px] py-3  self-center w-auto lg:w-[120px] h-[42px]"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="text-caption text-neutral-900">Browse Files</span>
                  </Button>
                </div>
                <input {...getInputProps()} />
              </div>
            </div>
          )}
          {tabluarView ? (
            <TablularMediaList />
          ) : (
            <InfiniteMeidaList setToggleModal={setToggleModal} setCurrentURL={setCurrentURL} />
          )}
        </TableContainer>
      </div>
      {toggleModal && <ImagePreview toggleModal={setToggleModal} url={currentURL} />}
    </main>
  );
};

export default BlogMedia;
