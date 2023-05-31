import React from 'react';

import ReactQuillEditor from '@atoms/editor';

import { IBlog } from '@particles/interface/blogEditContent.interface';

const TLTRText: React.FC<IBlog> = ({ content, setContent }) => {
  return (
    <ReactQuillEditor
      type={'heading'}
      initialValue={content.body[0].data}
      setCurrentValue={(value) => {
        setContent((prevValue) => {
          const updatedBody = [...prevValue.body];
          updatedBody[0] = {
            ...prevValue.body[0],
            data: value,
          };

          return {
            ...prevValue,
            body: updatedBody,
          };
        });
      }}
    />
  );
};

export default TLTRText;
