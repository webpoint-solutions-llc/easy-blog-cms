import React from 'react';

import clsx from 'clsx';

import TableIconOption from '../TableIconOption';
import ThreeDotsOptions, { IThreeDotsOptions } from '../ThreeDotOption';
import { ITableContentBody, ITableContentButton, TableControlType } from './content.interface';

const TableContentBody: React.FC<ITableContentBody> = ({ content, heading, includeId, tableControlType }) => {
  return (
    <table className="w-full px-6">
      <thead className="bg-neutral-200">
        {includeId && <th className="text-tableHead text-neutral-900  py-4">{'ID'}</th>}
        {heading.map((head, index) => (
          <th key={`${head}-${index}`} className="text-tableHead text-center text-neutral-900  py-4">
            {head}
          </th>
        ))}
        <th> </th>
      </thead>
      <tbody>
        {content.map((value, index) => {
          return (
            <tr key={`tableRow-${index}`} className="border-b border-b-dash-color">
              {value.map((keys, subIndex) => {
                if (!includeId && subIndex === 0) return <></>;
                let currentValue = keys;

                if (Array.isArray(currentValue)) {
                  currentValue = currentValue.join(', ');
                }

                if (subIndex === value.length - 1) {
                  if (tableControlType === TableControlType.tripleDot)
                    return (
                      <ThreeDotsOptions content={keys as IThreeDotsOptions[]} key={`${subIndex}-${keys}-${index}`} />
                    );
                  else if (tableControlType === TableControlType.button) {
                    const Buttons = keys as ITableContentButton[];

                    return <TableIconOption Buttons={Buttons} key={`${subIndex}-${keys}-${index}`} />;
                  } else {
                    return <></>;
                  }
                }

                return (
                  <td key={`${subIndex}-${keys}-${index}`} className="py-4 px-4">
                    <div
                      className={clsx(
                        'w-full flex text-bodysmall text-neutral-700',
                        subIndex === 1 && includeId ? 'justify-start' : 'justify-center',
                      )}
                    >
                      {currentValue as string | number | JSX.Element}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableContentBody;
