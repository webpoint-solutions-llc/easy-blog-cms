import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '@atoms/buttons';
import Heading from '@atoms/headers';
import InputSection from '@molecules/inputSection';
import { EButtonType } from '@atoms/buttons/button.types';
import { EHeadingSize } from '@atoms/headers/heading.types';

import adminLoginCSS from '@particles/css/adminLogin.module.css';

import { spaceRegex } from '@particles/const/validationRegex';

/**
 * It's a forgot password form that has an email input and a submit button for requesting
 * new password reset
 * @returns A React component
 */
const ForgotPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().matches(spaceRegex, 'Email cannot have spaces!').required(),
    }),
    onSubmit: () => {
      return;
    },
  });

  return (
    <section className="w-full mt-10">
      <Heading size={EHeadingSize.h4} className="text-h4 text-neutral-900">
        Enter your email to reset password
      </Heading>
      <form onSubmit={formik.handleSubmit} className={adminLoginCSS.formClass}>
        <InputSection
          placeholder="Enter email"
          label={'Email'}
          labelClass={adminLoginCSS.labelClass}
          containerClass={adminLoginCSS.inputContainerClass}
          className="max-h-[43px]"
          name="email"
          value={formik.values['email']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['email']}
          error={formik.touched['email'] ? formik.errors['email'] : undefined}
          bottomError={false}
        />
        <Button type="submit" btnType={EButtonType.primary}>
          Send Reset Password Link
        </Button>
      </form>
      <div className={adminLoginCSS.bottomLink}>
        <Link to={'/'} className={adminLoginCSS.bottomLinkText}>
          Go Back To Login
        </Link>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
