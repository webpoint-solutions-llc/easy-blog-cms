import React from 'react';

interface ITicketUserMessage {
  message: string;
  messageImage?: string;
}

const TicketUserMessage: React.FC<ITicketUserMessage> = ({ message, messageImage }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="w-7/12 flex justify-end">
        <div className="w-fit">
          {messageImage ? (
            <img src={messageImage} alt="Message image" width={'250px'} height={'250px'} className="rounded-md" />
          ) : (
            <div className="px-6 py-4 text-body2 text-neutral-800 rounded-lg bg-primary-30">{message}</div>
          )}
          <div className="text-caption text-neutral-500">{'9:33 PM'}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketUserMessage;
