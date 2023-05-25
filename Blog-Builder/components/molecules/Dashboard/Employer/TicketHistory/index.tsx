import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { Link } from 'react-router-dom';

import TicketStatusChip from './statusChip';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';

import FetchWrapper from '@molecules/FetchWrapper';
import ClipCSS from '@particles/css/lineClip.module.css';
import useFetchTickets from '@particles/hooks/dashboard/ticket/useFetchTickets';

const TicketsHistoryTable: React.FC = () => {
  const { data: TicketList, isLoading, isError } = useFetchTickets();

  return (
    <section>
      <FetchWrapper isLoading={isLoading} isError={isError}>
        {/* Table Header */}
        <div className="py-4 px-6 bg-neutral-200 text-caption font-bold text-neutral-900 flex">
          <span className="w-1/6">Ticket Number</span>
          <span className="w-1/6">Problem Type</span>
          <span className="w-1/3">Headline / Subject</span>
          <span className="w-1/6 text-center">Requested Date</span>
          <span className="w-1/12 text-center">Severity</span>
          <span className="w-1/12 text-center">Status</span>
        </div>
        {/* Table Body */}
        {TicketList?.data.map((history, index) => (
          <div
            key={`history-${index}`}
            className="text-bodysmall text-neutral-700 flex py-4 px-6 border-b border-b-eee items-center"
          >
            <Link to={`/dashboard/tickets/conversation/${history.ticketNumber}`} className="w-1/6">
              <a>
                <span className="text-caption font-bold text-link">{`#${history.ticketNumber}`}</span>
              </a>
            </Link>
            <span className="w-1/6">{history.problemType}</span>
            <span className={clsx('w-1/3', ClipCSS.lineClampTwo)}>{history.subject}</span>
            <span className="w-1/6 text-center">{moment(history.createdAt).format('LL')}</span>
            <span className="w-1/12 text-center">{history.severityLevel}</span>
            <span className="w-1/12 text-center grid place-items-center">
              <TicketStatusChip status={history.status} />
            </span>
          </div>
        ))}
        <div className="mt-8 pb-14">
          <TableFooter totalPage={TicketList?.totalPage} />
        </div>
      </FetchWrapper>
    </section>
  );
};

export default TicketsHistoryTable;
