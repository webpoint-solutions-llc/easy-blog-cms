import React from 'react';

import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

import { ITableContentButton } from '../TableContentBody/content.interface';
import Modal from '@molecules/Modal';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

const TableIconOption: React.FC<{ Buttons: ITableContentButton[] }> = ({ Buttons }) => {
  const location = useLocation();
  const navigator = useNavigate();

  const [deleteModal, setDeleteModal] = React.useState(false);

  const handleOnClick = (index: number) => {
    const newSearchParams = new URLSearchParams(location.search);

    const params = Buttons[index].params;

    if (params) {
      for (const param of params) {
        newSearchParams.set(param.key, param.value);
      }
      navigator({
        pathname: Buttons[index].link ? Buttons[index].link : '/',
        search: newSearchParams.toString(),
      });
    }
  };

  return (
    <td>
      <div className="flex gap-2 w-full justify-center">
        {Buttons.map((buttonElement, index) => {
          if (buttonElement.view) {
            return (
              <>
                <div
                  key={`${index}-${buttonElement.link}`}
                  className={clsx(
                    'w-10 h-10 flex items-center rounded cursor-pointer justify-center',
                    buttonElement.danger ? 'bg-danger-container text-error hover:bg-red-200' : 'hover:bg-primary-10',
                  )}
                  onClick={() => {
                    if (buttonElement.deleteModal) {
                      setDeleteModal((prevVal) => !prevVal);
                    } else {
                      handleOnClick(index);
                    }
                  }}
                >
                  <buttonElement.icon />
                </div>
                {buttonElement.deleteModal && buttonElement.Modal && deleteModal && (
                  <Modal toggleModal={setDeleteModal}>
                    <div className="px-4 py-[18px] shadow-card rounded-lg relative text-neutral-900">
                      <>
                        <div
                          className="absolute top-[18px] right-4 cursor-pointer"
                          onClick={() => setDeleteModal(false)}
                        >
                          <StaticPlusIcon className="w-6 h-6 rotate-45" />
                        </div>
                        {buttonElement.Modal(setDeleteModal)}
                      </>
                    </div>
                  </Modal>
                )}
              </>
            );
          }

          return <></>;
        })}
      </div>
    </td>
  );
};

export default TableIconOption;
