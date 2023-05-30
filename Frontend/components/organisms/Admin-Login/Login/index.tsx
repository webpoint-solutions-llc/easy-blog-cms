import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import Heading from '@atoms/headers';
import InputSection from '@molecules/inputSection';
import { EButtonType } from '@atoms/buttons/button.types';
import { EHeadingSize } from '@atoms/headers/heading.types';
import { spaceRegex } from '@particles/const/validationRegex';
import saveToLocalStorage from '@particles/helper/saveToLocal';
import getFromLocalStorage from '@particles/helper/getFromLocal';
import useLoginHooks from '@particles/hooks/users/UseLoginHooks';
import { IAdminLogin } from '@particles/responseInterface/login';
import removeFromLocalStorage from '@particles/helper/removeFromLocal';

import { Response } from '@particles/responseInterface/main';
import adminLoginCSS from '@particles/css/adminLogin.module.css';

/**
 * It's a login form that uses Formik and Yup for validation
 * @returns A React component.
 */
const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { uploadData, result, error } = useLoginHooks();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().matches(spaceRegex, 'Email cannot have spaces!').required('Email is required!'),
      password: Yup.string().required('Password is Required!'),
    }),
    onSubmit: async (value) => {
      await uploadData(value, 'ADMIN_PORTAL');
    },
  });

  React.useEffect(() => {
    if (result) {
      if (getFromLocalStorage('accessToken')) {
        removeFromLocalStorage('accessToken');
      }
      saveToLocalStorage('accessToken', result.data.data.accessToken);

      if (getFromLocalStorage('refreshToken')) {
        removeFromLocalStorage('refreshToken');
      }
      saveToLocalStorage('role', result?.data?.data?.role);
      saveToLocalStorage('refreshToken', result?.data.data.refreshToken);

      navigate('/dashboard/blogs/overview');
    }
    if (error) {
      const errorToDisplay = (error?.response?.data as Response<IAdminLogin>)?.message;

      toast.error(errorToDisplay || '', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  }, [result, error]);

  return (
    <section className="w-full mt-10">
      <Heading size={EHeadingSize.h4} className="text-h4 text-neutral-900">
        Login
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
        <InputSection
          placeholder="Enter password"
          label="Password"
          labelClass={adminLoginCSS.labelClass}
          className="max-h-[43px]"
          containerClass={adminLoginCSS.inputContainerClass}
          name="password"
          type="password"
          value={formik.values['password']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['password']}
          error={formik.touched['password'] ? formik.errors['password'] : undefined}
          bottomError={false}
        />
        <Button type="submit" btnType={EButtonType.primary}>
          Login
        </Button>
      </form>
      <div className={adminLoginCSS.bottomLink}>
        <Link to={'/forgot-password'} className={adminLoginCSS.bottomLinkText}>
          Forgot Your Password?
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
