import React from 'react';

import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import { mediaLibraryHeading } from '@particles/const/blogs/media/table';
import TableContentBody from '@organisms/Dashboard/TableContent/TableContentBody';
import useUploadMediaQuery from '@particles/hooks/dashboard/media/uploadMediaGet';
import { IThreeDotsOptions } from '@organisms/Dashboard/TableContent/ThreeDotOption';
import {
  ITableContentButton,
  TableControlType,
} from '@organisms/Dashboard/TableContent/TableContentBody/content.interface';

type Props = {};

const TablularMediaList = (props: Props) => {
  const [content, setContent] = React.useState<{ url: string; alt: string; type: string; id: string }[] | null>(null);
  const [tabularContent, setTabularContent] =
    React.useState<(number | JSX.Element | string | string[] | IThreeDotsOptions[] | ITableContentButton[])[][]>();

  const { getUploadData, result: fetchResult } = useUploadMediaQuery();

  /* A hook that is used to fetch data from the server. */
  React.useEffect(() => {
    getUploadData(1, 10, '');
  }, []);

  return (
    <>
      {tabularContent && (
        <>
          <TableContentBody
            content={tabularContent}
            includeId={false}
            tableControlType={TableControlType.button}
            heading={mediaLibraryHeading}
          />
          <TableFooter totalPage={fetchResult?.data?.totalPage} />
        </>
      )}
    </>
  );
};

export default TablularMediaList;
