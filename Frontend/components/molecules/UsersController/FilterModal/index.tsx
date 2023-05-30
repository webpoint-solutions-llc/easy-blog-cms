import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import InputSection from '@molecules/inputSection';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

import { EButtonType } from '@atoms/buttons/button.types';
import useGetParams from '@particles/hooks/usetGetParams';

interface IUsersControllerFilterModal {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersControllerFilterModal: React.FC<IUsersControllerFilterModal> = ({ toggleModal }) => {
  const navigate = useNavigate();
  const search = useGetParams('search') || '';
  const startDate = useGetParams('startDate') || '';
  const endDate = useGetParams('endDate') || '';

  const [filterData, setFilterData] = React.useState({
    fullName: search,
    startDate: startDate,
    endDate: endDate,
  });

  const applyFilter = () => {
    const url = new URLSearchParams();

    url.append('search', filterData.fullName);
    url.append('startDate', filterData.startDate);
    url.append('endDate', filterData.endDate);

    navigate({
      pathname: location.pathname,
      search: url.toString(),
    });

    toggleModal(false);
  };

  const resetFilter = () => {
    const url = new URLSearchParams();

    url.append('search', '');
    url.append('startDate', '');
    url.append('endDate', '');

    setFilterData({
      fullName: '',
      startDate: '',
      endDate: '',
    });
    navigate({
      pathname: location.pathname,
      search: url.toString(),
    });

    toggleModal(false);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <section className="relative py-[34px] px-6">
        <div className="absolute top-[18px] right-4 cursor-pointer" onClick={() => toggleModal(false)}>
          <StaticPlusIcon className="w-6 rotate-45 text-neutral-700" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-h4 text-neutral-900">Filter by</h4>
        </div>
        <div className="mt-8">
          <InputSection
            label={'Full Name'}
            value={filterData.fullName}
            placeholder="Enter users full name"
            onChange={(e) =>
              setFilterData((prevVal) => ({
                ...prevVal,
                fullName: e.target.value,
              }))
            }
            labelClass="text-body3 text-neutral-900"
            containerClass="flex flex-col gap-[6px]"
          />
          <div className="flex flex-nowrap gap-3 items-center mt-6">
            <InputSection
              label={'Joined start date'}
              value={filterData.startDate}
              onChange={(e) =>
                setFilterData((prevVal) => ({
                  ...prevVal,
                  startDate: e.target.value,
                }))
              }
              labelClass="text-body3 text-neutral-900"
              containerClass="flex flex-col gap-[6px] w-full"
              type="date"
            />
            <div className="w-3 mt-6 border-b border-neutral-700"></div>
            <InputSection
              label={'Joined end date'}
              value={filterData.endDate}
              onChange={(e) =>
                setFilterData((prevVal) => ({
                  ...prevVal,
                  endDate: e.target.value,
                }))
              }
              labelClass="text-body3 text-neutral-900"
              containerClass="flex flex-col gap-[6px] w-full"
              type="date"
            />
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <Button
              btnType={EButtonType.outline}
              onClick={() => {
                resetFilter();
                toggleModal(false);
              }}
            >
              Reset
            </Button>
            <Button onClick={applyFilter}>Apply Filter</Button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default UsersControllerFilterModal;
