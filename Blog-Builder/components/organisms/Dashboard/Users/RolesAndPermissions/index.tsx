import React from 'react';

import RolesFilter from './RolesFilter';
import FetchWrapper from '@molecules/FetchWrapper';
import BlogsHeadAddNew from '@molecules/Blogs/BlogsHeadAddNew';
import useFetchUserList from '@particles/hooks/users/useFetchUserList';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import UsersControllerAddUser from '@molecules/UsersController/AddUser';
import TableContainer from '@organisms/Dashboard/TableContent/TableContainer';
import { IUser } from '@particles/responseInterface/user/user.list.interface';
import UserControllerDeleteModal from '@molecules/UsersController/DeleteModal';
import useMutationUserExport from '@particles/hooks/users/useMutationUserExport';
import TableContentBody from '@organisms/Dashboard/TableContent/TableContentBody';
import UserControllerChangeRoleModal from '@molecules/UsersController/ChangeRoleModal';
import { formattedContent, heading } from '@particles/const/users/roles-and-permissions/table';
import { TableControlType } from '@organisms/Dashboard/TableContent/TableContentBody/content.interface';

const RolesAndPermissions: React.FC = () => {
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [toggleRole, setToggleRole] = React.useState<string | undefined>();
  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const [addNewUser, setAddNewModal] = React.useState(false);

  const { data: userList, isLoading, isError } = useFetchUserList(true);
  const { mutate: exportExcel } = useMutationUserExport();

  const content = formattedContent(userList?.data, setCurrentUser, setDeleteModal, setToggleRole);

  return (
    <main className="container mx-auto py-4">
      <div className="mt-10">
        <BlogsHeadAddNew
          heading="Roles and Permissions"
          onClick={() => {
            setAddNewModal(true);
          }}
        />
      </div>
      <div className="mt-6">
        <TableContainer>
          <RolesFilter
            onExportCSVClick={() => {
              exportExcel();
            }}
          />
          <FetchWrapper isError={isError} isLoading={isLoading} totalData={userList?.totalData}>
            <TableContentBody
              tableControlType={TableControlType.button}
              content={content}
              heading={heading}
              includeId={true}
            />
            <TableFooter totalPage={userList?.totalPage} />
          </FetchWrapper>
        </TableContainer>
      </div>
      {deleteModal && currentUser && (
        <UserControllerDeleteModal toggleModal={setDeleteModal} currentUser={currentUser} />
      )}
      {toggleRole && currentUser && (
        <UserControllerChangeRoleModal toggleModal={setToggleRole} currentUser={currentUser} newRole={toggleRole} />
      )}
      {addNewUser && <UsersControllerAddUser toggleModal={setAddNewModal} />}
    </main>
  );
};

export default RolesAndPermissions;
