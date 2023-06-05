import React from 'react';

import Modal from '@molecules/Modal';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

export enum enumToggleParamType {
  'string',
  'boolean',
}

interface IAlertDialogProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  toggleModal: React.Dispatch<React.SetStateAction<any>>;
  toggleParamType?: enumToggleParamType;
}

const AlertDialog: React.FC<IAlertDialogProps> = ({ title, description, icon, toggleParamType, toggleModal }) => {
  const handleToggle = () => {
    if (toggleParamType === enumToggleParamType.string) toggleModal(undefined);
    else toggleModal(false);
  };

  return (
    <Modal toggleModal={handleToggle}>
      <section className="px-6 py-[85px] bg-white rounded-lg relative">
        <div className="absolute top-[18px] right-4 cursor-pointer" onClick={handleToggle}>
          <StaticPlusIcon className="w-6 rotate-45" />
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          {icon ? icon : null}

          <h4 className="text-h4 text-neutral-900">{title}</h4>
          <p className="text-body2 text-neutral-600">{description}</p>
        </div>
      </section>
    </Modal>
  );
};

export default AlertDialog;
