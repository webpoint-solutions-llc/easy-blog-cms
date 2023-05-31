import React, { useRef } from 'react';

import ProfileNavSection from '@molecules/ProfileNavSection';

/**
 * Design of Navigation bar for the dashboard including functionality of notification bell
 * and user logo for logging out and other functionalities
 *
 * @returns JSX of navigation bar
 */
const NavigationSection: React.FC = () => {
  const [notificationShow, setNotificationShow] = React.useState<boolean>(false);
  const [profileShow, setProfileShow] = React.useState<boolean>(false);
  const notificationSection = useRef<HTMLDivElement>(null);
  const profileSection = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const clickOutsideBox = (e: MouseEvent) => {
      if (notificationSection.current && !notificationSection.current.contains(e.target as Node)) {
        setNotificationShow(false);
      }
      if (profileSection.current && !profileSection.current.contains(e.target as Node)) {
        setProfileShow(false);
      }
    };
    window.addEventListener('click', clickOutsideBox);

    return () => window.removeEventListener('click', clickOutsideBox);
  }, []);

  return (
    <header className="w-full flex items-center h-[8vh] min-h-[60px] shadow-signupPage">
      <section className="px-8 w-full flex justify-between items-center">
        <div>{/* You can put your company's logo here */}</div>
        <nav className="flex gap-10 items-center">
          {/* Temporary Removal! This feature should be added when notification section is to be implemented! */}
          {/* <div className="relative" ref={notificationSection}>
            <NotificationBellIcon
              onClick={() => setNotificationShow((prevValue) => !prevValue)}
              className="w-6 h-6 cursor-pointer"
              notificationStatus={notifications.filter((notification) => notification.read).length > 0}
            />
            {notificationShow && <NotificationNavSection notifications={notifications} />}
          </div> */}
          <div className="relative" ref={profileSection}>
            <div
              className="w-10 h-10 rounded-full bg-primary-60 flex justify-center items-center px-[11px] py-2 cursor-pointer"
              onClick={() => setProfileShow((prevState) => !prevState)}
            >
              {/* Logo here */}
            </div>
            {profileShow && <ProfileNavSection />}
          </div>
        </nav>
      </section>
    </header>
  );
};

export default NavigationSection;
