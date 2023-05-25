import React from 'react';

import clsx from 'clsx';

import ThreeDotsIcon from '@atoms/icons/Three-Dots-Icon';
import { IconFunctionType } from '@atoms/icons/iconFunctionType.interface';
import { Link } from 'react-router-dom';
import Modal from '@molecules/Modal';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

export interface IThreeDotsOptions {
  value: string;
  icon?: React.FC<IconFunctionType>;
  link?: string;
  iconClass?: string;
  functionRun?: (toggleThreeDots: React.Dispatch<React.SetStateAction<boolean>>) => void;
  Modal?: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const ThreeDotsOptions: React.FC<{ content: IThreeDotsOptions[] }> = ({ content }) => {
  const dotsClick = React.useRef<HTMLDivElement>(null);
  const [showValues, setShowValues] = React.useState<boolean>(false);

  const [deleteModal, setDeleteModal] = React.useState(false);

  React.useEffect(() => {
    const clickOutsideBox = (e: MouseEvent) => {
      if (dotsClick.current && !dotsClick.current.contains(e.target as Node)) {
        setShowValues(false);
      }
    };
    window.addEventListener('click', clickOutsideBox);

    return () => window.removeEventListener('click', clickOutsideBox);
  }, []);

  return (
    <td>
      <div className="relative" ref={dotsClick}>
        <div className="cursor-pointer p-3" onClick={() => setShowValues((prevValue) => !prevValue)}>
          <ThreeDotsIcon className="w-[19px] h-1 cursor-pointer" />
        </div>

        <div className="absolute flex flex-col right-full top-0 w-[190px] shadow-notificationContainer rounded bg-white z-10">
          {showValues &&
            content.map((value, index) => {
              if (value.link) {
                return (
                  <Link to={value.link} key={`${value.value}-${index}`}>
                    <div
                      className={clsx(
                        'p-4 flex gap-4 hover:bg-primary-00 min-w-max rounded text-neutral-900',
                        index === content.length - 1 && 'border-t border-t-dash-color text-error',
                      )}
                    >
                      {value.icon && <value.icon />}
                      <span className="text-bodysmall">{value.value}</span>
                    </div>
                  </Link>
                );
              }
              if (value.functionRun) {
                return (
                  <>
                    <div
                      key={`${value.value}-${index}`}
                      className={clsx(
                        'p-4 flex gap-4 cursor-pointer hover:bg-primary-00 min-w-max rounded text-neutral-900',
                        index === content.length - 1 && 'border-t border-t-dash-color text-error',
                      )}
                      onClick={() => {
                        if (value.Modal) {
                          setDeleteModal(true);
                        } else {
                          if (value.functionRun) value.functionRun(setShowValues);
                        }
                      }}
                    >
                      {value.icon && <value.icon />}
                      <span className="text-bodysmall">{value.value}</span>
                    </div>
                    {value.Modal && deleteModal && (
                      <Modal toggleModal={setDeleteModal}>
                        <div className="px-4 py-[18px] shadow-card rounded-lg relative">
                          <>
                            <div
                              className="absolute top-[18px] right-4 cursor-pointer"
                              onClick={() => setDeleteModal(false)}
                            >
                              <StaticPlusIcon className="w-6 h-6 rotate-45" />
                            </div>
                            {value.Modal(setDeleteModal)}
                          </>
                        </div>
                      </Modal>
                    )}
                  </>
                );
              }
            })}
        </div>
      </div>
    </td>
  );
};

export default ThreeDotsOptions;
