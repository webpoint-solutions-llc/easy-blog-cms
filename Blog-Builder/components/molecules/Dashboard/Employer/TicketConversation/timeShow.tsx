import React from 'react';

const TimeShowConversation: React.FC<{ time: string }> = ({ time }) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-full border-b border-b-neutral-300"></div>
      <div className="text-center min-w-fit text-caption text-neutral-900 opacity-70">{time}</div>
      <div className="w-full border-b border-b-neutral-300"></div>
    </div>
  );
};

export default TimeShowConversation;
