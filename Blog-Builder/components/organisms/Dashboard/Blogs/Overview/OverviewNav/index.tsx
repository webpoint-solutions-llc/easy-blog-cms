import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker, Range } from 'react-date-range';

import CalendarIcon from '@atoms/icons/Calendar-Icon';
import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';

import overviewNavCSS from '@particles/css/blogs/overview/overviewNav.module.css';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

/**
 * Overview Navigation with date range selector
 * @returns Overview Navigation with date range selector
 */
const OverviewNav: React.FC = () => {
  const navigate = useNavigate();

  const [dateRangeOpen, setDateRangeOpen] = React.useState<boolean>(false);
  const [dateRange, setDateRange] = React.useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const dateSelection = React.useRef<HTMLDivElement>(null);
  const dateSelectionButton = React.useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setDateRangeOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('from', moment(dateRange[0]?.startDate).format('YYYY-MM-DD') || '');
    searchParams.set('to', moment(dateRange[0]?.endDate).format('YYYY-MM-DD') || '');

    navigate({ pathname: '.', search: searchParams.toString() }, { replace: true });
  }, [dateRange]);

  React.useEffect(() => {
    const clickOutsideBox = (e: MouseEvent) => {
      if (
        dateSelection.current &&
        !dateSelection.current.contains(e.target as Node) &&
        dateSelectionButton.current &&
        !dateSelectionButton.current.contains(e.target as Node)
      ) {
        setDateRangeOpen(false);
      }
    };
    window.addEventListener('click', clickOutsideBox);

    return () => window.removeEventListener('click', clickOutsideBox);
  }, []);

  return (
    <main className="w-full relative z-0">
      <section className={overviewNavCSS.contentContainer}>
        <h3 className="text-h3">Here’s your latest site activity</h3>
        <div className={overviewNavCSS.calendarButton} onClick={handleOnClick} ref={dateSelectionButton}>
          <div className="flex items-center gap-3">
            <CalendarIcon />
            <span className="text-bodysmall text-neutral-900">
              {dateRange[0].startDate?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              -{' '}
              {dateRange[0].endDate?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <ChevonDownIcon className="w-5 h-5 rotate-180" />
          </div>
        </div>
      </section>
      <div className={clsx(overviewNavCSS.calendarContainer, !dateRangeOpen && 'hidden')} ref={dateSelection}>
        <DateRangePicker
          onChange={(item) => setDateRange([item.selection])}
          months={2}
          ranges={dateRange}
          moveRangeOnFirstSelection={false}
          direction="horizontal"
        />
      </div>
    </main>
  );
};

export default OverviewNav;
