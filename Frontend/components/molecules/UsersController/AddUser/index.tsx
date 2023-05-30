import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import { USER_ROLES_VALUE } from './const';
import AlertDialog from '@molecules/AlertDialog';
import SearchIcon from '@atoms/icons/Search-Icon';
import InputSection from '@molecules/inputSection';
import ReactSelect from '@atoms/react-select/ReactSelect';
import { EButtonType } from '@atoms/buttons/button.types';
import GreenCheckIcon from '@atoms/icons/Green-Check-Icon';
import { emailRegex } from '@particles/const/validationRegex';
import { generatePassword } from '@particles/helper/randomPassword';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import useMutationUserPost from '@particles/hooks/users/useMutationUserPost';

interface IUsersControllerAddUser {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersControllerAddUser: React.FC<IUsersControllerAddUser> = ({ toggleModal }) => {
  const { mutate: createUser, isSuccess } = useMutationUserPost();

  const formik = useFormik({
    initialValues: {
      email: '',
      role: 'author',
      fullName: '',
      password: generatePassword(10),
      action: 'invite-user',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required('Full name of user is required!'),
      email: Yup.string().matches(emailRegex, 'Must be a valid email format!').required('Email is required!'),
    }),
    onSubmit: async (value) => {
      await createUser(value);
    },
  });

  if (isSuccess) {
    return (
      <AlertDialog
        toggleModal={toggleModal}
        icon={<GreenCheckIcon className="w-14 h-14 mb-6" />}
        title="Invite sent successfully "
        description="You have successfully sent an invite to the email"
      />
    );
  }

  return (
    <Modal toggleModal={toggleModal}>
      <section className="px-6 py-[34px] bg-white rounded-lg relative">
        <div className="absolute top-[18px] right-4 cursor-pointer" onClick={() => toggleModal(false)}>
          <StaticPlusIcon className="w-6 rotate-45" />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-h4 text-neutral-900">Add new user</h4>
          <p className="text-body2 text-neutral-600">
            Enter email address and full name to send invite and let them access this page
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-[26px] flex flex-col gap-6">
          <InputSection
            name="fullName"
            value={formik.values['fullName']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched['fullName']}
            error={formik.touched['fullName'] ? formik.errors['fullName'] : undefined}
            placeholder="User's Full Name"
            bottomError={false}
          />
          <div className="flex flex-nowrap">
            <Inputs
              className="rounded-none rounded-l-md w-full"
              Icon={SearchIcon}
              IconClass="text-neutral-500 w-[20px]"
              placeholder="Search by email address"
              name="email"
              value={formik.values['email']}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={formik.touched['email']}
              error={formik.touched['email'] ? formik.errors['email'] : undefined}
            />
            <ReactSelect
              value={formik.values['role']}
              containerClassName="w-[160px] z-50"
              borderRadius="0 4px 4px 0"
              backgroundColor="#F1F1F1"
              placeholderColor="#262626"
              valueColor="#262626"
              options={USER_ROLES_VALUE}
              onValueChange={(value) => formik.setFieldValue('role', value)}
              onBlur={() => formik.setFieldTouched('role')}
              error={formik.touched['role'] ? formik.errors['role'] : undefined}
              downArrow={true}
            />
          </div>

          <div className="border border-dash-color w-full"></div>
          <div className="flex gap-4 justify-end">
            <Button type="button" btnType={EButtonType.outline} onClick={() => toggleModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Invite</Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default UsersControllerAddUser;
