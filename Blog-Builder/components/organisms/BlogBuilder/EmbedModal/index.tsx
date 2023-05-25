import React from 'react';

import Modal from '@molecules/Modal';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import InputSection from '@molecules/inputSection';
import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';

interface IEmbedModal {
  title: string;
  toggleModal: React.Dispatch<React.SetStateAction<boolean | string>>;
  saveValue: (value: string) => void;
}

const EmbedModal: React.FC<IEmbedModal> = ({ title, toggleModal, saveValue }) => {
  const [link, setLink] = React.useState('');

  return (
    <Modal toggleModal={toggleModal}>
      <div className="p-4 flex justify-between">
        <div className="pl-2 pt-[10px] pb-4">
          <h4 className="text-h4 text-neutral-900">{title}</h4>
        </div>
        <div onClick={() => toggleModal(false)} className="cursor-pointer">
          <StaticPlusIcon className="w-6 text-neutral-700 rotate-45" />
        </div>
      </div>
      <div className="px-[22px] pb-8">
        <InputSection
          label={'Enter embedded link'}
          labelClass="text-body3 text-neutral-900"
          placeholder={`${title} link`}
          containerClass="flex gap-[6px]"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="mt-6 flex justify-end gap-4">
          <Button btnType={EButtonType.outline} onClick={() => toggleModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              saveValue(link);
              toggleModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmbedModal;
