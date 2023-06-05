import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import useUploadMediaQuery from '@particles/hooks/dashboard/media/uploadMediaGet';

import useGetParams from '@particles/hooks/usetGetParams';
import { MediaList } from '@particles/interface/blogContent.interface';
import useUploadMediaMigration from '@particles/hooks/dashboard/media/uploadMediaPost';

import '@particles/css/blogbuilder/imagePreview.modal.css';

interface IImageSelector {
  toggleImageSelector: React.Dispatch<React.SetStateAction<boolean>>;
  contentSet: (file: MediaList) => void;
}

const ImageSelector: React.FC<IImageSelector> = ({ toggleImageSelector, contentSet }) => {
  const location = useLocation();
  const navigator = useNavigate();
  const backdrop = React.useRef<HTMLDivElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [selectImageName, setSelectImageName] = React.useState<string>();

  const pageNo = useGetParams('pageNo') || '1';

  const { postUploadData, error: uploadFileError, result: uploadFileResult } = useUploadMediaMigration();

  const { getUploadData, result: fetchResult } = useUploadMediaQuery();

  function validateFileExtension(file: globalThis.File) {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    return allowedExtensions.test(file.name);
  }

  function handleFileChange() {
    if (fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];
      if (validateFileExtension(file)) {
        // Call your function here with the selected file
        postUploadData(file);

        const URLParam = new URLSearchParams(location.search);

        URLParam.set('pageNo', '1');

        navigator({
          pathname: location.pathname,
          search: URLParam.toString(),
        });
      } else {
        alert('Invalid file type. Please select a JPEG, JPG, or PNG file.');
      }
    }
  }

  React.useEffect(() => {
    const escPress = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        toggleImageSelector(false);
      }
    };

    window.addEventListener('keydown', escPress);

    return () => window.removeEventListener('keydown', escPress);
  }, []);

  React.useEffect(() => {
    const backdropClick = (e: MouseEvent) => {
      if (backdrop.current && backdrop.current.contains(e.target as Node)) {
        toggleImageSelector(false);
      }
    };

    window.addEventListener('click', backdropClick);

    return () => window.removeEventListener('click', backdropClick);
  }, []);

  const getData = (page: number) => {
    getUploadData(page, 10, '');
  };

  React.useEffect(() => {
    getData(parseInt(pageNo));
  }, [pageNo]);

  React.useEffect(() => {
    if (!uploadFileError && uploadFileResult) {
      getData(parseInt(pageNo));
    }
  }, [uploadFileError, uploadFileResult]);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);

    // set the new value for the 'pageNo' parameter
    newSearchParams.set('pageNo', '1');

    let path = location.pathname;
    if (path[path.length - 1] !== '/') {
      path = path + '/';
    }

    navigator({
      pathname: path,
      search: newSearchParams.toString(),
    });
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-screen h-screen overflow-hidden bg-scrim" ref={backdrop}></div>
      <main className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <section className="w-[640px] overflow-scroll max-h-screen bg-white p-6 rounded-lg">
          <div className="flex w-full justify-between">
            <h4 className="text-h4 text-neutral-900">Image upload</h4>
            <div
              onClick={() => {
                toggleImageSelector(false);
              }}
            >
              <StaticPlusIcon className="w-6 h-6 text-neutral-700 rotate-45 cursor-pointer" />
            </div>
          </div>
          <label htmlFor="mediaImage" className="mt-8 flex flex-col gap-[7px]">
            <div className="text-body3 text-neutral-900 opacity-70">Upload image</div>
            <div className="flex border border-normal-input rounded overflow-hidden">
              <div className="py-[11.5px] px-[25.5px] bg-neutral-200 text-caption text-neutral-900">
                {selectImageName ? selectImageName : 'Choose File'}
              </div>
              <div className="px-6 py-[10px]">
                <span className="text-bodysmall text-neutral-500">No file choosen</span>
              </div>
            </div>
            <input
              type="file"
              name="mediaImage"
              id="mediaImage"
              className="hidden"
              accept="image/jpeg, image/jpg, image/png"
              ref={fileRef}
              onChange={handleFileChange}
            />
          </label>
          <div className="w-full flex items-center justify-between gap-[17px] mt-6">
            <div className="border-b border-b-neutral-300 w-full"></div>
            <div className="">or</div>
            <div className="border-b border-b-neutral-300 w-full"></div>
          </div>
          <section className="mt-6">
            <p className="text-body3 text-neutral-900 opacity-70">Select from media</p>
            <div className="mt-4 p-4 border border-dashed border-neutral-400 rounded grid grid-cols-4">
              {fetchResult &&
                fetchResult.data.data.map((value, index) => {
                  return (
                    <div
                      className="bg-neutral-300 w-[136.75px] aspect-square rounded-[4.3412px] overflow-hidden flex justify-center items-center cursor-pointer"
                      key={`image-${index}`}
                      onClick={() => {
                        contentSet(value);
                        toggleImageSelector(false);
                      }}
                    >
                      <img src={value.file.completedUrl} className="object-cover" />
                    </div>
                  );
                })}
            </div>
          </section>
          <TableFooter totalPage={fetchResult?.data.totalPage} />
          <div className="w-full flex justify-end gap-4 mt-6">
            <Button
              btnType={EButtonType.outline}
              onClick={() => {
                toggleImageSelector(false);
              }}
            >
              Cancel
            </Button>
            <Button>Upload</Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ImageSelector;
