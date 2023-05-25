import React from 'react';

import clsx from 'clsx';

import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import ConfirmationModalCSS from '@particles/css/ConfimationModal.module.css';
import useGetParams from '@particles/hooks/usetGetParams';
interface IConfimationModal {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleOk: () => void;
  replacement?: string[];
  name: string;
  sentence: string;
  title?: string;
  buttonValue?: string;
}

const ConfimationModal: React.FC<IConfimationModal> = ({
  toggleModal,
  handleOk,
  name,
  sentence,
  replacement,
  title = 'Recommend this CV?',
  buttonValue = 'Recommend CV',
}) => {
  const modalBackdrop = React.useRef<HTMLDivElement>(null);
  const companyName = useGetParams('companyName') || '';

  let replacementVal = replacement;
  if (!replacement) {
    replacementVal = [name, companyName];
  }

  let value = sentence;

  if (replacementVal) {
    for (let i = 0; i < replacementVal.length; i++) {
      value = value.replace(/%variable%/, `<strong>${replacementVal[i]}</strong>`);
    }
  }

  React.useEffect(() => {
    const backdropClick = (e: MouseEvent) => {
      if (modalBackdrop && modalBackdrop.current?.contains(e.target as Node)) {
        toggleModal(false);
      }
    };
    const onESCPress = (ev: globalThis.KeyboardEvent) => {
      if (ev && ev.key === 'Escape') {
        toggleModal(false);
      }
    };

    window.addEventListener('keydown', onESCPress);
    window.addEventListener('click', backdropClick);

    return () => {
      window.removeEventListener('click', backdropClick);
      window.removeEventListener('keydown', onESCPress);
    };
  }, []);

  // For API Call
  const recommendCV = () => {
    handleOk();
    toggleModal(false);
  };

  return (
    <>
      <div className={clsx(ConfirmationModalCSS.modal, ConfirmationModalCSS.backdrop)} ref={modalBackdrop} />
      <div className={clsx(ConfirmationModalCSS.modalContainer)}>
        <section className={ConfirmationModalCSS.modalContent}>
          <article>
            <h4 className={ConfirmationModalCSS.modalHeader}>{title}</h4>
            <p className={ConfirmationModalCSS.modalDescription} dangerouslySetInnerHTML={{ __html: value }} />
          </article>
          <div className={ConfirmationModalCSS.crossIconContainer} onClick={() => toggleModal(false)}>
            <StaticPlusIcon className={ConfirmationModalCSS.crossIcon} />
          </div>
        </section>
        <div className={ConfirmationModalCSS.modalFooter}>
          <Button
            btnType={EButtonType.outline}
            className={ConfirmationModalCSS.footerBtn}
            onClick={() => toggleModal(false)}
          >
            Cancel
          </Button>
          <Button className={ConfirmationModalCSS.footerBtn} onClick={recommendCV}>
            {buttonValue}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfimationModal;
