import React from 'react';

interface IMediaDetails {
  name: string;
  mime: string;
  uploadedOn: string;
  dimension: string;
  size: string;
}

const MediaDetails: React.FC<IMediaDetails> = ({ name, size, dimension, mime, uploadedOn }) => {
  return (
    <div className="rounded-lg bg-primary-00 p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-4/12 text-captionBold text-neutral-900">File Name :</div>
        <div className="w-8/12 text-body2 text-neutral-800">{name}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4/12 text-captionBold text-neutral-900">File Type :</div>
        <div className="w-8/12 text-body2 text-neutral-800">{mime}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4/12 text-captionBold text-neutral-900">Uploaded on :</div>
        <div className="w-8/12 text-body2 text-neutral-800">{uploadedOn}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4/12 text-captionBold text-neutral-900">Dimension :</div>
        <div className="w-8/12 text-body2 text-neutral-800">{dimension}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4/12 text-captionBold text-neutral-900">File Size :</div>
        <div className="w-8/12 text-body2 text-neutral-800">{size}</div>
      </div>
    </div>
  );
};

export default MediaDetails;
