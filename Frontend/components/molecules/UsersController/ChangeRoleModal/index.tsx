import React from 'react';

import Chip from '@atoms/chip';
import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import { EButtonType } from '@atoms/buttons/button.types';
import GreenCheckIcon from '@atoms/icons/Green-Check-Icon';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import AlertDialog, { enumToggleParamType } from '@molecules/AlertDialog';
import { IUser } from '@particles/responseInterface/user/user.list.interface';
import useMutationUserRolePatch from '@particles/hooks/users/useMutationUserRolePatch';

interface IUserControllerChangeRoleModal {
  toggleModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentUser: IUser;
  newRole: string;
}

const UserControllerChangeRoleModal: React.FC<IUserControllerChangeRoleModal> = ({
  toggleModal,
  currentUser,
  newRole,
}) => {
  const { mutate: changeRole, isSuccess } = useMutationUserRolePatch();

  if (isSuccess) {
    return (
      <AlertDialog
        toggleModal={toggleModal}
        toggleParamType={enumToggleParamType.string}
        icon={<GreenCheckIcon className="w-14 h-14 mb-6" />}
        title="Roles successfully changed! "
        description="You have successfully changed the user’s role"
      />
    );
  }
  return (
    <Modal toggleModal={toggleModal}>
      <section className="relative cursor-pointer px-6 py-[34px] bg-white rounded-lg flex flex-col gap-[26px]">
        <div className="absolute top-[18px] right-4" onClick={() => toggleModal(undefined)}>
          <StaticPlusIcon className="w-6 rotate-45" />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-h4 text-neutral-900">Change role</h4>
          <p className="text-body2 text-neutral-600">
            Are you sure you want to change the role of user <strong>{currentUser.fullName}</strong>?
          </p>
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="flex gap-3 items-center">
            <img
              src={'/components/particles/images/users/user-placeholder.jpg'}
              className="w-[52px] aspect-square rounded-full"
            />
            <span className="text-listDetail text-neutral-900">{currentUser.fullName}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Chip text={currentUser.role.name} />
            <div className="w-6 border-b border-b-neutral-500"></div>
            <Chip text={newRole} primary={false} />
          </div>
        </div>
        <div className="w-full border border-dash-color"></div>
        <div className="flex justify-end gap-4">
          <Button btnType={EButtonType.outline} onClick={() => toggleModal(undefined)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              changeRole({ role: newRole?.toLocaleLowerCase(), _id: currentUser._id });
            }}
          >
            Change Role
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default UserControllerChangeRoleModal;
