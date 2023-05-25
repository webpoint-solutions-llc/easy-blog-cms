import React from 'react';

import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';

const ModalDelete: React.FC<{
  name: string;
  deleteFunction: () => void;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ name, deleteFunction, closeModal }) => {
  return (
    <section className="px-2 py-4">
      <div className="flex flex-col gap-2">
        <h4 className="text-h4 text-neutral-900">Do you want to delete this modal?</h4>
        <p className="text-body2 text-neutral-600">Are you sure you want to delete {name}?</p>
      </div>
      <div className="w-full flex justify-end gap-4 mt-12">
        <Button btnType={EButtonType.outline} onClick={() => closeModal(false)}>
          Cancel
        </Button>
        <Button
          btnType={EButtonType.none}
          className="w-[140px] py-3 flex justify-center items-center bg-error text-white"
          onClick={() => {
            deleteFunction();
            closeModal(false);
          }}
        >
          Delete
        </Button>
      </div>
    </section>
  );
};

export default ModalDelete;
