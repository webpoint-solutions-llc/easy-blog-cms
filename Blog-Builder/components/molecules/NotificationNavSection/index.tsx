import React from 'react';

import clsx from 'clsx';

import Heading from '@atoms/headers';
import { EHeadingSize } from '@atoms/headers/heading.types';

import { contentPlaceholder } from '@particles/const/notificationPlaceholder';

import navSection from '@particles/css/navDropDownContainer.module.css';

interface INotificationNavSection {
  image?: string;
  user: string;
  content: string;
  name?: string;
  time: string;
  read?: boolean;
}

/**
 * Notification drop down content section
 * @returns JSX for nav bar notification showing
 */
const NotificationNavSection: React.FC<{ notifications: INotificationNavSection[] }> = ({ notifications }) => {
  return (
    <section className={clsx(navSection.navContainer, navSection.notificationSection)}>
      <div className="w-full flex justify-between items-end pb-4">
        <Heading size={EHeadingSize.h5} className="text-h5">
          Notifications
        </Heading>
        <a className="font-medium text-[13px] leading-[18px] text-link cursor-pointer">Mark All As Read</a>
      </div>
      {notifications.map((notification) => (
        <>
          <div className={navSection.notificationContainer}>
            <article className="flex gap-[13px]">
              {notification.image ? (
                <img src={notification.image} className="w-14 h-14" />
              ) : (
                <div className={navSection.defaultIconNotification}>
                  <span className="text-2xl leading-[32.4px] font-bold text-neutral-900">{`${
                    notification.user.split(' ')[0].split('')[0]
                  }`}</span>
                </div>
              )}
              <div className="flex flex-col gap-1 max-w-[320px]">
                <p className="text-sm leading-[23px] font-medium">
                  <span className="font-bold">{notification.user} </span>
                  {contentPlaceholder[notification.content as keyof typeof contentPlaceholder]}
                  {notification.name && <span className="font-bold"> {notification.name}</span>}.
                </p>
                <p className="text-[13px] leading-[22px] text-neutral-600">{notification.time}</p>
              </div>
            </article>
            {notification.read && <div className={navSection.notificationRead} />}
          </div>
        </>
      ))}
      <div className="py-4 text-[13px] leading-[22px] font-bold text-link">
        <a className="cursor-pointer">See All Notifications ({notifications.length})</a>
      </div>
    </section>
  );
};

export default NotificationNavSection;
