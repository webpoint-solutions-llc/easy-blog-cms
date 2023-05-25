import React from 'react';

import clsx from 'clsx';

import { ApplicantsStatus } from '@molecules/CandidateCard';

/**
 * It takes in a status and returns a div with a className and a statusValue
 * @param  - React.FC<{ status: ApplicantsStatus }>
 */
const StatusChip: React.FC<{ status: ApplicantsStatus }> = ({ status }) => {
  let className = 'bg-pending-background border border-pending-border text-neutral-900';
  let statusValue = 'Pending';

  if (status === ApplicantsStatus.accepted) {
    className = 'text-green-highlight bg-status-active-background border border-status-active-border';
    statusValue = 'Accepted';
  }
  if (status === ApplicantsStatus.rejected) {
    className = 'text-error bg-rejected-background border border-rejected-border';
    statusValue = 'Rejected';
  }

  return (
    <div className={clsx(className, 'text-roleFont max-h-[28px] px-3 py-[6px] rounded-[100px]')}>{statusValue}</div>
  );
};

export default StatusChip;
