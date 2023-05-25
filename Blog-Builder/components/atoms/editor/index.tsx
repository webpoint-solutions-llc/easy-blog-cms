import React, { useEffect } from 'react';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface IReactQuillEditor {
  type?: string;
  placeholder?: string;
  initialValue: string;
  setCurrentValue: (value: string) => void;
}

const ReactQuillEditor: React.FC<IReactQuillEditor> = ({ type, placeholder, initialValue, setCurrentValue }) => {
  const [value, setValue] = React.useState(initialValue);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <div>
      {/* <CustomToolbar /> */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        modules={{
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'],
              ['link'],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
              [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
              [{ direction: 'rtl' }], // text direction

              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ align: [] }],

              ['clean'],
            ],
          },
        }}
        style={{ borderRadius: '4px' }}
      ></ReactQuill>
    </div>
  );
};

export default ReactQuillEditor;
