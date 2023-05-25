import React from 'react';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import InputSection from '@molecules/inputSection';
import { EButtonType } from '@atoms/buttons/button.types';
import useGetParams from '@particles/hooks/usetGetParams';
import ReactSelect from '@atoms/react-select/ReactSelect';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

import { filterRole, lastLogin as LastLoginOptions } from './const';

interface IFilterUserModal {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterUserModal: React.FC<IFilterUserModal> = ({ toggleModal }) => {
  const navigate = useNavigate();

  const fullName = useGetParams('fullName') || '';
  const lastLogin = useGetParams('lastLogin') || '';
  const role = useGetParams('content') || '';

  const formik = useFormik({
    initialValues: {
      fullName: fullName || '',
      lastLogin: lastLogin || 'Any time',
      role: role || '',
    },
    onSubmit: async (value) => {
      const url = new URLSearchParams();

      url.append('fullName', value.fullName);
      url.append('lastLogin', value.lastLogin);
      url.append('content', value.role);
      url.append('pageNo', '1');

      navigate({
        pathname: location.pathname,
        search: url.toString(),
      });

      toggleModal(false);
      return;
    },
  });

  return (
    <Modal toggleModal={toggleModal}>
      <section className="px-6 py-[34px]">
        <div className="absolute top-[18px] right-4 cursor-pointer" onClick={() => toggleModal(false)}>
          <StaticPlusIcon className="w-6 rotate-45" />
        </div>
        <div>
          <h4 className="text-h4 text-neutral-900">Filter by</h4>
        </div>
        <form className="mt-8" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8">
            <InputSection
              label={'Full Name'}
              labelClass="text-body3 text-neutral-900 opacity-70"
              containerClass="flex flex-col gap-[6px]"
              placeholder="eg. Esther Howard"
              name="fullName"
              value={formik.values['fullName']}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={formik.touched['fullName']}
              error={formik.touched['fullName'] ? formik.errors['fullName'] : undefined}
            />
            <div className="flex flex-col gap-[6px]">
              <label className="text-body3 text-neutral-900 opacity-70">Last login</label>
              <ReactSelect
                value={formik.values['lastLogin']}
                onValueChange={(value) => formik.setFieldValue('lastLogin', value)}
                onBlur={() => formik.setFieldTouched('lastLogin')}
                options={LastLoginOptions}
                downArrow={true}
                isSearchable={false}
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-body3 text-neutral-900 opacity-70">Role</label>
              <ReactSelect
                value={formik.values['role']}
                onValueChange={(value) => formik.setFieldValue('role', value)}
                onBlur={() => formik.setFieldTouched('role')}
                downArrow={true}
                options={filterRole}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <Button
              btnType={EButtonType.outline}
              onClick={() => {
                const url = new URLSearchParams();

                url.append('search', '');
                url.append('lastLogin', '');
                url.append('content', '');

                navigate({
                  pathname: location.pathname,
                  search: url.toString(),
                });

                formik.resetForm();
              }}
            >
              Reset
            </Button>
            <Button type="submit">Apply Filter</Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FilterUserModal;
