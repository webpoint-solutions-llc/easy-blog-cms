import React from 'react';

import TrashIcon from '@atoms/icons/Trash-Icon';
import PencilIcon from '@atoms/icons/Pencil-Icon';

import moment from 'moment';
import CustomDropDown from '@molecules/CustomDropDown';
import { IUser } from '@particles/responseInterface/user/user.list.interface';

export const heading = ['Full Name', 'Email', 'Joined', 'Role'];

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
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  setToggleRole: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const options = ['Author', 'Admin', 'Delete User'];

  return data?.map((row: IUser, index: number) => {
    const content = options.map((val, index) => {
      return {
        label: val,
        onClick: () => {
          // Set current user value so we can change it
          setCurrentUser(row);
          if (index !== options.length - 1) {
            setToggleRole(val);

            return;
          }
          if (index === options.length - 1) {
            setDeleteModal(true);
          }
        },
      };
    });

    return [
      <React.Fragment key={`index-${index}`}>{index + 1}</React.Fragment>,
      <div className="flex gap-3 justify-center w-full items-center" key={`user-${index}`}>
        <img
          src={row?.photo?.completedUrl || '/talentpoint-icon.png'}
          width={52}
          height={52}
          className="rounded-full"
        />
        <span className="text-bodysmall text-neutral-700">{row?.fullName}</span>
      </div>,
      <React.Fragment key={`email-${index}`}>{row.email}</React.Fragment>,
      <React.Fragment key={`joined-${index}`}>{moment(row.createdAt).fromNow()}</React.Fragment>,
      <CustomDropDown
        content={content}
        currentValue={row.role?.name}
        dangerLast={true}
        key={`custom-dropdown-${index}`}
      />,
      [],
    ];
  });
};
