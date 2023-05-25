import React from 'react';

import UserIcon from '@atoms/icons/User-Icon';

interface IOtherMessagePreview {
  name: string;
  image?: string;
  message: string;
  time?: string;
  messageImage?: string;
}

const OtherMessagePreview: React.FC<IOtherMessagePreview> = ({ name, image, message, time, messageImage }) => {
  return (
    <div className="w-full">
      <div className="w-7/12 flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="w-14"></div>
          <div className="text-caption text-neutral-700">{name}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-14 h-14 min-w-[56px] max-h-[56px] rounded-full overflow-hidden">
            {image ? (
              <div className="w-full h-full relative">
                <img src={image} alt="user-sender" className="w-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-full grid place-items-center bg-neutral-300">
                <UserIcon />
              </div>
            )}
          </div>

          {messageImage ? (
            <img src={messageImage} width={500} height={400} alt="Picture of the author" />
          ) : (
            <div className="px-6 py-4 text-body2 text-neutral-800 rounded-lg bg-neutral-100">{message}</div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-14"></div>
          <div className="text-caption text-neutral-500">{'9:33 PM'}</div>
        </div>
      </div>
    </div>
  );
};

export default OtherMessagePreview;
