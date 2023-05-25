import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

interface INotificationBell extends IconFunctionType {
  notificationStatus?: boolean;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Notification bell icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-6 h-6)
 * @props color: color of SVG Icon. Default #5c5c5c
 * @props notificationStatus: Shows dot if notification is available. Default(false)
 * @props onClick: onClick event to handle
 *
 * @returns Notification bell Icon JSX SVG Icon
 */
const NotificationBellIcon: React.FC<INotificationBell> = ({
  className = 'w-6 h-6',
  color = '#5C5C5C',
  notificationStatus = false,
  onClick = (e) => {
    e.preventDefault();
  },
}) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path
        d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {notificationStatus && <circle cx="19" cy="8" r="4.5" fill="#DB1920" stroke="white" />}
    </svg>
  );
};

export default NotificationBellIcon;
