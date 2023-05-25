import React from 'react';

import clsx from 'clsx';

const Modal: React.FC<{
  children: JSX.Element | JSX.Element[];
  transparentBg?: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<any>>;
}> = ({ children, toggleModal, transparentBg }) => {
  const backdrop = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    /**
     * If the backdrop element contains the target of the event, then toggle the modal to false
     * @param {MouseEvent} e - MouseEvent - this is the event that is passed to the function.
     */
    const backdropClickCheck = (e: MouseEvent) => {
      if (backdrop.current && backdrop.current.contains(e.target as Node)) {
        toggleModal(false);
      }
    };
    /**
     * If the key pressed is the escape key, then toggle the modal to false.
     * @param {KeyboardEvent} e - KeyboardEvent - this is the event object that is passed to the
     * function.
     */
    const escPress = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        toggleModal(false);
      }
    };

    window.addEventListener('click', backdropClickCheck);
    window.addEventListener('keydown', escPress);

    return () => {
      window.removeEventListener('click', backdropClickCheck);
      window.removeEventListener('keydown', escPress);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-scrim z-10" ref={backdrop}></div>
      <div
        className={clsx(
          'fixed z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[640px] rounded-lg shadow-card',
          transparentBg ? 'bg-transparent' : 'bg-white',
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
