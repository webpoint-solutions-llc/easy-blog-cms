import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import AlertDialog from '@molecules/AlertDialog';
import InputSection from '@molecules/inputSection';
import TrashBgIcon from '@atoms/icons/Trash-Bg-Icon';
import { EButtonType } from '@atoms/buttons/button.types';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import { IUser } from '@particles/responseInterface/user/user.list.interface';
import useMutationDeleteUserWithPassword from '@particles/hooks/users/useMutationDeleteUserWithPassword';

import { transformFormikErrors } from '@particles/helper/transformFormikErrors';

interface IUserControllerDeleteModal {
  toggleModal: React.Dispatch<any>;
  currentUser: IUser;
}

const UserControllerDeleteModal: React.FC<IUserControllerDeleteModal> = ({ toggleModal, currentUser }) => {
  const { mutate: deleteUser, isSuccess, isError, isLoading, error } = useMutationDeleteUserWithPassword();

  const formik = useFormik({
    initialValues: {
      password: '',
      reason: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(),
      reason: Yup.string(),
    }),
    onSubmit: (value) => {
      deleteUser({ ...value, id: currentUser._id });
    },
  });

  React.useEffect(() => {
    if (error) {
      const formattedErrors = transformFormikErrors(error);
      if (isError) formik.setErrors(formattedErrors);
    }
  }, [error]);

  if (isSuccess) {
    return (
      <AlertDialog
        toggleModal={toggleModal}
        icon={<TrashBgIcon className="w-14 h-14 mb-6" />}
        title="User successfully removed! "
        description="You have successfully removed this user"
      />
    );
  }

  return (
    <Modal toggleModal={toggleModal}>
      <section className="bg-white py-[34px] px-6 relative">
        <div className="absolute top-[18px] right-4 cursor-pointer" onClick={() => toggleModal(false)}>
          <StaticPlusIcon className="w-6 rotate-45" />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-h4 text-neutral-900">Remove User</h4>
          <p className="text-body2 text-neutral-600">
            Are you sure you want to delete user <strong>{currentUser.fullName}</strong> from the list?{' '}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="mt-6 flex flex-col gap-6">
            <InputSection
              label={'Enter password for authentication'}
              type="password"
              value={formik.values['password']}
              name={'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={formik.touched['password']}
              error={formik.touched['password'] ? formik.errors['password'] : undefined}
              placeholder="Password"
              labelClass="text-body3 text-neutral-900 opacity-70"
              containerClass="flex flex-col gap-[6px]"
            />
            <div className="flex flex-col gap-[6px]">
              <label className="text-body3 text-neutral-900 opacity-70">Reason for removal (optional)</label>
              <textarea
                name="reason"
                value={formik.values['reason']}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-[120px] resize-none placeholder:text-body3 placeholder:text-neutral-500 px-4 py-[10px] rounded border border-normal-input"
                placeholder="Reason for removing this user"
              ></textarea>
            </div>
          </div>
          <div className="w-full border border-dash-color"></div>
          <div className="w-full flex justify-end gap-4">
            <Button type="button" btnType={EButtonType.outline} onClick={() => toggleModal(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              btnType={EButtonType.none}
              className="text-white text-caption bg-error rounded py-3 px-[31px]"
            >
              Remove User
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default UserControllerDeleteModal;
