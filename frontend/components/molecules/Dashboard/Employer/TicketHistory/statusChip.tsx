import React from 'react';

import clsx from 'clsx';

const TicketStatusChip: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div
      className={clsx(
        'border px-3 py-[6px] max-w-fit rounded-full text-caption',
        status.toLowerCase() === 'closed'
          ? 'bg-status-active-background border-status-active-border text-green-highlight'
          : status.toLowerCase() === 'pending'
          ? 'bg-pendingBG border-neutral-500 text-neutral-900'
          : 'bg-openedBG border-openedBorder text-error',
      )}
    >
      {status}
    </div>
  );
};

export default TicketStatusChip;
