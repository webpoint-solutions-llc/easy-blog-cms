import React from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';

import TableFooterCSS from '@particles/css/blogs/tablefooter.module.css';

import useCurrentPage from '@particles/hooks/useCurrentPage';

const TableFooter: React.FC<{ totalPage?: number }> = ({ totalPage = 10 }) => {
  const navigator = useNavigate();
  const currentPage = useCurrentPage();

  const nextPaginationRequest = (pageNumber: string) => {
    const newSearchParams = new URLSearchParams(location.search);

    // set the new value for the 'pageNo' parameter
    newSearchParams.set('pageNo', pageNumber);

    let path = location.pathname;
    if (path[path.length - 1] !== '/') {
      path = path + '/';
    }

    navigator({
      pathname: path,
      search: newSearchParams.toString(),
    });
  };

  if (!totalPage || totalPage === 0) {
    return <></>;
  }

  return (
    <div className={TableFooterCSS.footerContainer}>
      <div
        className={TableFooterCSS.buttonContainer}
        onClick={() => {
          if (currentPage !== 1) nextPaginationRequest((currentPage - 1).toString());
        }}
      >
        <ChevonDownIcon className="w-[18px] h-[18px] -rotate-90" />
      </div>
      {totalPage <= 5 ? (
        // show all pages if total pages is less than or equal to 5
        Array.from(Array(totalPage), (_, i) => i + 1).map((page) => (
          <div
            key={page}
            className={clsx(TableFooterCSS.buttonContainer, page === currentPage && 'bg-primary-60')}
            onClick={() => nextPaginationRequest(page.toString())}
          >
            {page}
          </div>
        ))
      ) : (
        // show first 3 pages, current page, last 3 pages, and ellipsis
        <>
          {currentPage < 3 || currentPage + 2 > totalPage ? (
            <>
              {Array.from(Array(3), (_, i) => i + 1).map((value) => (
                <div
                  key={`page-${value}`}
                  className={clsx(TableFooterCSS.buttonContainer, value === currentPage && 'bg-primary-60')}
                  onClick={() => nextPaginationRequest(value.toString())}
                >
                  {value}
                </div>
              ))}
              <div className={TableFooterCSS.buttonContainer}>...</div>
              {Array.from(Array(3), (_, i) => totalPage - 2 + i).map((value) => (
                <div
                  key={`page-${value}`}
                  className={clsx(TableFooterCSS.buttonContainer, value === currentPage && 'bg-primary-60')}
                  onClick={() => nextPaginationRequest(value.toString())}
                >
                  {value}
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={clsx(TableFooterCSS.buttonContainer)} onClick={() => nextPaginationRequest('1')}>
                {1}
              </div>
              <div className={TableFooterCSS.buttonContainer}>...</div>
              {Array.from(Array(3), (_, i) => currentPage - 1 + i).map((value) => (
                <div
                  key={`page-${value}`}
                  className={clsx(TableFooterCSS.buttonContainer, value === currentPage && 'bg-primary-60')}
                  onClick={() => nextPaginationRequest(value.toString())}
                >
                  {value}
                </div>
              ))}
              <div className={TableFooterCSS.buttonContainer}>...</div>
              <div
                className={clsx(TableFooterCSS.buttonContainer)}
                onClick={() => nextPaginationRequest(totalPage.toString())}
              >
                {totalPage}
              </div>
            </>
          )}
        </>
      )}

      <div
        className={TableFooterCSS.buttonContainer}
        onClick={() => {
          if (currentPage !== totalPage) nextPaginationRequest((currentPage + 1).toString());
        }}
      >
        <ChevonDownIcon className="w-[18px] h-[18px] rotate-90" />
      </div>
    </div>
  );
};

export default TableFooter;
