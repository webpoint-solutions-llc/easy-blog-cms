import Modal from '@molecules/Modal';
import React from 'react';

const ImagePreview: React.FC<{
  url: string;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ url, toggleModal }) => {
  return (
    <Modal toggleModal={toggleModal} transparentBg={true}>
      <section className="h-screen flex items-center bg-transparent">
        <img src={url} className="object-contain w-full" />
      </section>
    </Modal>
  );
};

export default ImagePreview;
