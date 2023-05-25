import React from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import CogIcon from '@atoms/icons/Cog-Icon';

import LogoutIcon from '@atoms/icons/Logout-Icon';
import UserGroupIcon from '@atoms/icons/UserGroup-Icon';
import getFromLocalStorage from '@particles/helper/getFromLocal';
import removeFromLocalStorage from '@particles/helper/removeFromLocal';
import navSection from '@particles/css/navDropDownContainer.module.css';

/**
 * Profile dropdown nav section
 * @returns A React component that renders a section of profile dropdown in nav
 */
const ProfileNavSection: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    removeFromLocalStorage('accessToken');
    removeFromLocalStorage('refreshToken');
  };

  return (
    <section className={navSection.navContainer}>
      <div
        className={clsx(navSection.profileLinks, 'border-b border-b-[#EEE]')}
        onClick={() => navigate('/dashboard/home/account-setting')}
      >
        <CogIcon />
        <span className={navSection.profileLinksStyle}>Account Settings</span>
      </div>
      {getFromLocalStorage('role') === 'superadmin' ||
        (getFromLocalStorage('role') === 'admin' && (
          <div className={clsx(navSection.profileLinks, 'border-b border-b-[#EEE]')}>
            <UserGroupIcon />
            <span className={navSection.profileLinksStyle}>Role Management</span>
          </div>
        ))}
      <div className={clsx(navSection.profileLinks)} onClick={logout}>
        <LogoutIcon />
        <span className={navSection.profileLinksStyle}>Logout</span>
      </div>
    </section>
  );
};

export default ProfileNavSection;
