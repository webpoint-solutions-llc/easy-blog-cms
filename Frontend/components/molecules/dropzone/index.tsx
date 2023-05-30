import React from 'react';

import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';
import GreenCheckIcon from '@atoms/icons/Green-Check-Icon';
import CloudUploadIcon from '@atoms/icons/CloudUpload-Icon';
import DocumentIcon from '@atoms/icons/Document-Search-Icon';

import DropzoneCSS from '@particles/css/dragzone.module.css';

interface IDropzone {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  heading: string;
  files: JSX.Element[] | undefined;
  maxFileSize: string;
  acceptedFiles: string;
}

const Dropzone: React.FC<IDropzone> = ({ getRootProps, getInputProps, heading, files, maxFileSize, acceptedFiles }) => {
  return (
    <section className="relative">
      <div
        {...getRootProps({
          className: DropzoneCSS.container,
        })}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <CloudUploadIcon />
          <h5 className="text-h5 text-neutral-900">{heading}</h5>
          <span className="text-caption text-neutral-700">or</span>
          <Button btnType={EButtonType.none} type="button" className="w-[120px] py-3 bg-neutral-400">
            Browse Files
          </Button>
          {files && (
            <ul className="text-excerpt2 text-link self-center list-none">
              <span className="flex items-center gap-[6px] underline">
                <DocumentIcon />
                {files}
                <GreenCheckIcon />
              </span>
            </ul>
          )}
        </div>
        <input {...getInputProps()} />
      </div>
      <div className={DropzoneCSS.dropzoneDetails}>
        <span>Maximum upload file size: {maxFileSize}</span>
        <span>Files supported: {acceptedFiles}</span>
      </div>
    </section>
  );
};

export default Dropzone;
