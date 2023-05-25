import React, { useState } from 'react';
import FetchWrapper from '@molecules/FetchWrapper';
import BlogsHeadAddNew from '@molecules/Blogs/BlogsHeadAddNew';
import { navigateContent } from '@particles/const/users/navigation';
import useFetchUserList from '@particles/hooks/users/useFetchUserList';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import UsersControllerAddUser from '@molecules/UsersController/AddUser';
import { formattedContent, heading } from '@particles/const/users/table';
import FilterUserModal from '@molecules/UsersController/FilterUsersModal';
import { IUser } from '@particles/responseInterface/user/user.list.interface';
import TableContainer from '@organisms/Dashboard/TableContent/TableContainer';
import useMutationUserExport from '@particles/hooks/users/useMutationUserExport';
import TableHeadContent from '@organisms/Dashboard/TableContent/TableHeadContent';
import TableContentBody from '@organisms/Dashboard/TableContent/TableContentBody';
import UserControllerChangeRoleModal from '@molecules/UsersController/ChangeRoleModal';
import { TableControlType } from '@organisms/Dashboard/TableContent/TableContentBody/content.interface';

const DashboardUsers: React.FC = () => {
  const { data: userList, isLoading, isError } = useFetchUserList(true);
  const [addNewUser, setAddNewModal] = React.useState(false);
  const [filter, setFilter] = React.useState(false);

  const [toggleRole, setToggleRole] = React.useState<string | undefined>();
  const [currentUser, setCurrentUser] = React.useState<IUser>();

  const content = formattedContent(userList?.data, setCurrentUser, setToggleRole);
  const { mutate: exportExcel } = useMutationUserExport();

  return (
    <main className="container mx-auto py-4">
      <div className="mt-10">
        <BlogsHeadAddNew
          heading="Users"
          buttonPlaceholder="Add New"
          onClick={() => {
            setAddNewModal(true);
          }}
        />
      </div>
      <div className="mt-6">
        <TableContainer>
          <TableHeadContent
            content={navigateContent}
            onExportCSVClick={() => {
              exportExcel();
            }}
            setFilter={setFilter}
            inputPlaceholder="Search Users"
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

      {toggleRole && currentUser && (
        <UserControllerChangeRoleModal toggleModal={setToggleRole} currentUser={currentUser} newRole={toggleRole} />
      )}
      {addNewUser && <UsersControllerAddUser toggleModal={setAddNewModal} />}
      {filter && <FilterUserModal toggleModal={setFilter} />}
    </main>
  );
};

export default DashboardUsers;
