import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import Heading from '@atoms/headers';
import { EHeadingSize } from '@atoms/headers/heading.types';
import InputSection from '@molecules/inputSection';
import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';

import adminLoginCSS from '@particles/css/adminLogin.module.css';

const ResetPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordRepeat: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('Password is Required!'),
      newPasswordRepeat: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!')
        .required('Repeat new password!'),
    }),
    onSubmit: () => {
      return;
    },
  });

  return (
    <section className="w-full mt-10">
      <Heading size={EHeadingSize.h4} className="text-h4 text-neutral-900">
        Login
      </Heading>
      <form onSubmit={formik.handleSubmit} className={adminLoginCSS.formClass}>
        <InputSection
          placeholder="Enter new password"
          label="Create new password"
          labelClass={adminLoginCSS.labelClass}
          className="max-h-[43px]"
          containerClass={adminLoginCSS.inputContainerClass}
          name="newPassword"
          type="password"
          value={formik.values['newPassword']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['newPassword']}
          error={formik.touched['newPassword'] ? formik.errors['newPassword'] : undefined}
          bottomError={false}
        />
        <InputSection
          placeholder="Confirm new password"
          label="Confirm password"
          labelClass={adminLoginCSS.labelClass}
          className="max-h-[43px]"
          containerClass={adminLoginCSS.inputContainerClass}
          name="newPasswordRepeat"
          type="password"
          value={formik.values['newPasswordRepeat']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['newPasswordRepeat']}
          error={formik.touched['newPasswordRepeat'] ? formik.errors['newPasswordRepeat'] : undefined}
          bottomError={false}
        />
        <Button type="submit" btnType={EButtonType.primary}>
          Login
        </Button>
      </form>
    </section>
  );
};

export default ResetPasswordForm;
