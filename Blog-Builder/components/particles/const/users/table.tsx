import React from 'react';

import moment from 'moment';

import TrashIcon from '@atoms/icons/Trash-Icon';
import PencilIcon from '@atoms/icons/Pencil-Icon';
import CustomDropDown from '@molecules/CustomDropDown';
import DeleteUser from '@molecules/UsersController/DeleteUser';

import { timeAgo } from '@particles/helper/time';
import getFromLocalStorage from '@particles/helper/getFromLocal';
import { IUser } from '@particles/responseInterface/user/user.list.interface';

export const heading = ['Full Name', 'Email', 'Last Login', 'Role', 'Posts'];

export const includeId = false;

export const example = [
  [
    8013,
    <div className="flex gap-3 items-center" key="user-1">
      <img
        src="/components/particles/images/users/user-placeholder.jpg"
        width={52}
        height={52}
        className="rounded-full"
      />
      <span className="text-bodysmall text-neutral-700">EstherDarko</span>
    </div>,
    'tanya.hill@example.com',
    '12min ago',
    <div key="role-1" className="bg-role-bg rounded-full px-3 py-[6px] text-roleFont text-sub-role">
      Author
    </div>,
    12,
    [
      { icon: PencilIcon, link: '/' },
      { icon: TrashIcon, link: '/', danger: true },
    ],
  ],
];

export const formattedContent = (
  data: IUser[] | any,
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
  setToggleRole: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const role = getFromLocalStorage('role');
  const options = ['Author', 'Admin'];

  return data?.map((row: IUser, index: number) => {
    const content = options.map((val, index) => {
      return {
        label: val,
        onClick: () => {
          // Set current user value so we can change it
          setCurrentUser(row);
          setToggleRole(val);
        },
      };
    });

    return [
      index + 1,
      <div className="flex gap-3 items-center" key="user-1">
        <img
          src={row?.photo?.completedUrl || '/talentpoint-icon.png'}
          width={52}
          height={52}
          className="rounded-full min-h-[52px] min-w-[52px]"
        />
        <span className="text-bodysmall text-neutral-700">{row?.fullName}</span>
      </div>,
      row.email,
      row?.lastLogin ? timeAgo(row?.lastLogin) : '-',
      <>
        {role === 'superadmin' ? (
          row.role?.name === 'superadmin' ? (
            <div key="role-1" className="bg-role-bg rounded-full px-3 py-[6px] text-roleFont text-sub-role">
              {row.role?.name}
            </div>
          ) : (
            <CustomDropDown
              content={content}
              currentValue={row.role?.name}
              dangerLast={false}
              key={`custom-dropdown-${index}`}
            />
          )
        ) : (
          <div key="role-1" className="bg-role-bg rounded-full px-3 py-[6px] text-roleFont text-sub-role">
            {row.role?.name}
          </div>
        )}
      </>,
      row.totalBlogs,
      [
        {
          icon: TrashIcon,
          link: '/',
          danger: true,
          view: row.role?.name !== 'superadmin' && role === 'superadmin',
          deleteModal: true,
          Modal: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => {
            return <DeleteUser currentUser={row} toggleModal={closeModal} />;
          },
        },
      ],
    ];
  });
};
