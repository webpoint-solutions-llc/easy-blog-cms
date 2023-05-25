import React from 'react';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import adminLoginCSS from '@particles/css/adminLogin.module.css';

/**
 * Template for Admin login Page
 * @returns JSX Template for admin login section
 */
const AdminLogin: React.FC = () => {
  return (
    <main className={adminLoginCSS.page}>
      <section className={adminLoginCSS.loginContainer}>
        <div className="flex flex-col text-center">
          <p className="text-[13px] leading-[22px] text-neutral-600 mt-1">Admin Portal</p>
        </div>
        <Outlet />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default AdminLogin;
