import React from 'react';

import clsx from 'clsx';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import ListIcon from '@atoms/icons/List-Icon';
import SliderIcon from '@atoms/icons/Slider-Icon';
import SearchIcon from '@atoms/icons/Search-Icon';
import DownloadIcon from '@atoms/icons/Download-Icon';
import useGetParams from '@particles/hooks/usetGetParams';
import { EBIconPlacing, EButtonType } from '@atoms/buttons/button.types';

type onClickHandle = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => null | void;

interface ITableHeadContent {
  content?: string[];
  onExportCSVClick?: onClickHandle;
  exportActive?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
  setFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  urlParams?: Record<string, any>;
  inputPlaceholder?: string;
}

const TableHeadContent: React.FC<ITableHeadContent> = ({
  content,
  onExportCSVClick,
  exportActive = true,
  setState,
  setFilter,
  urlParams,
  inputPlaceholder = 'Type keyword to search',
}) => {
  const location = useLocation();
  const navigator = useNavigate();

  let queryContent = useGetParams('content');

  if (
    (queryContent &&
      content &&
      !content.includes(queryContent.charAt(0).toUpperCase() + queryContent.slice(1).toLowerCase())) ||
    (!queryContent && content)
  ) {
    queryContent = content[0].toLowerCase();
  }

  const handleSearch = (e: any) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(location.search);

    // set the new value for the 'pageNo' parameter
    newSearchParams.set('search', e.target.value);
    newSearchParams.set('pageNo', '1');

    let path = location.pathname;
    if (path[path.length - 1] !== '/') {
      path = path + '/';
    }

    navigator({
      pathname: path,
      search: newSearchParams.toString(),
    });
  };

  return (
    <div className="p-6 flex flex-col gap-4 lg:flex-row lg:gap-0 justify-between items-center">
      <div className="min-w-max max-w-fit flex">
        {content &&
          content.map((value, index) => (
            <div
              className={clsx(
                'px-4 py-[10px] border border-neutral-300 cursor-pointer hover:bg-neutral-100',
                index === 0 && 'rounded-l',
                index === content.length - 1 && 'rounded-r',
                value.toLowerCase() === queryContent ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600',
              )}
              onClick={(e) => {
                e.preventDefault();

                const newSearchParams = new URLSearchParams(location.search);

                // set the new value for the 'pageNo' parameter
                newSearchParams.set('content', value.toLowerCase());
                newSearchParams.set('pageNo', '1');

                navigator({
                  pathname: location.pathname,
                  search: newSearchParams.toString(),
                });
              }}
              key={value}
            >
              <span>{value}</span>
            </div>
          ))}
      </div>
      <div className="flex gap-4 items-center">
        <Inputs
          className="max-h-[42px] md:w-[300px] xl:w-[432px] placeholder:text-caption placeholder:text-neutral-500 text-neutral-900"
          Icon={SearchIcon}
          onChange={handleSearch}
          value={useGetParams('search') || ''}
          IconClass="w-[18px] h-[18px] text-neutral-500"
          placeholder={inputPlaceholder}
        />
        {exportActive && (
          <>
            <Button
              btnType={EButtonType.outline}
              Icon={DownloadIcon}
              iconPlace={EBIconPlacing.left}
              className="flex gap-2 h-[42px] px-3"
              onClick={onExportCSVClick}
            >
              Export CSV
            </Button>
          </>
        )}
        {setFilter && (
          <Button
            btnType={EButtonType.outline}
            Icon={SliderIcon}
            iconPlace={EBIconPlacing.left}
            className="flex gap-2 h-[42px] px-3"
            onClick={() => setFilter(true)}
          />
        )}
        {setState && (
          <Button
            btnType={EButtonType.outline}
            Icon={ListIcon}
            iconPlace={EBIconPlacing.left}
            className="flex gap-2 h-[42px] px-3"
            onClick={() => setState((prevValue) => !prevValue)}
          />
        )}
      </div>
    </div>
  );
};

export default TableHeadContent;
