import React from 'react';

import moment from 'moment';
import { useFormik } from 'formik';
import { subMonths } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import PlusIcon from '@atoms/icons/Plus-Icon';
import { EButtonType } from '@atoms/buttons/button.types';
import ReactSelect from '@atoms/react-select/ReactSelect';

import { ticketProblemType, ticketSeverityType } from '@particles/const/Dashboard/Employer/tickets';

interface ITicketHistoryFilter {
  toggleFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketHistoryFilter: React.FC<ITicketHistoryFilter> = ({ toggleFilter }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      severity: 'High',
      problemType: 'Technical',
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
    },
    onSubmit: async (value) => {
      const urlParams = new URLSearchParams(location.search);

      urlParams.set('severity', value.severity);
      urlParams.set('problemType', value.problemType);
      urlParams.set('startDate', value.startDate.toISOString());
      urlParams.set('endDate', value.endDate.toISOString());

      urlParams.set('pageNo', '1');

      navigate({
        pathname: location.pathname,
        search: urlParams.toString(),
      });

      toggleFilter(false);
    },
  });

  return (
    <section className="absolute top-full right-0">
      <div className="relative px-6 py-8 bg-white rounded-lg shadow-notificationContainer w-[396px]">
        <div className="absolute top-4 right-4 rotate-45 cursor-pointer" onClick={() => toggleFilter(false)}>
          <PlusIcon color="#262626" />
        </div>
        <h5 className="text-h5 text-neutral-900">Filter by</h5>
        <form onSubmit={formik.handleSubmit} className="mt-6 flex flex-col gap-4">
          <ReactSelect
            value={formik.values['severity']}
            onValueChange={(value) => formik.setFieldValue('severity', value)}
            label="Severity"
            labelClassName="text-body3New text-neutral-900 opacity-70"
            containerClassName="flex flex-col gap-[6px]"
            downArrow={true}
            onBlur={() => formik.setFieldTouched('severity')}
            options={ticketSeverityType}
            isSearchable={false}
          />
          <ReactSelect
            value={formik.values['problemType']}
            onValueChange={(value) => formik.setFieldValue('problemType', value)}
            label="Problem Type"
            labelClassName="text-body3New text-neutral-900 opacity-70"
            containerClassName="flex flex-col gap-[6px]"
            downArrow={true}
            onBlur={() => formik.setFieldTouched('problemType')}
            options={ticketProblemType}
            isSearchable={false}
          />
          <div className="flex flex-nowrap gap-3 items-center">
            <div className="flex flex-col gap-[6px] w-5/12 min-w-[156px]">
              <label className="text-body3New text-neutral-900 opacity-70">Start date</label>
              <Inputs
                type="date"
                name="startDate"
                value={moment(formik.values['startDate']).format('YYYY-MM-DD')}
                className="max-h-[42px]"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="border-b border-b-neutral-700 h-[1px] w-1/6 max-w-[12px] mt-6"></div>
            <div className="flex flex-col gap-[6px] w-5/12 min-w-[156px]">
              <label className="text-body3New text-neutral-900 opacity-70">End date</label>
              <Inputs
                type="date"
                name="endDate"
                value={moment(formik.values['endDate']).format('YYYY-MM-DD')}
                className="max-h-[42px]"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button
              type="button"
              btnType={EButtonType.outlineBtnSecondary}
              className="w-[120px] py-3 border border-neutral-900 text-neutral-900"
              onClick={() => {
                formik.resetForm();
                toggleFilter(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-[120px] py-3">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TicketHistoryFilter;
