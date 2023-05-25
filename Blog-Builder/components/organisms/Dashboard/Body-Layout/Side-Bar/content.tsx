import React from 'react';

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';

import { IActive, ISideBarContent } from '.';

import SideBarCSS from '@particles/css/sideBar.module.css';

interface IContent extends ISideBarContent {
  active: IActive;
}

/**
 * Side bar singular content with expandable content if subContent exists
 * @props title <string>:- Title of the side bar
 * @props link <string>:- Link of the side bar
 * @props icon <React.FC<IconFunctionType>>:- React function of icon svg
 * @props subContent <{title:string, link:string}>:- Sub content of the main content
 * it consists of title and link of the content. It is not required.
 * @props active <{page:string, subPage?:string}>:- This is the active status of the page. It has page and subPages. Subpages are optional.
 * @returns JSX of SideBarContent
 */
const SideBarContent: React.FC<IContent> = ({ title, link, icon: Icon, subContent, active }) => {
  const [pageState, setPageState] = React.useState<boolean>(!!(active?.page === title.toLowerCase()));
  const [, setSubPage] = React.useState<boolean>(!!active.subPage);

  const contentReference = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const clickOutsideBox = (e: MouseEvent) => {
      if (
        contentReference.current &&
        !contentReference.current.contains(e.target as Node) &&
        contentReference.current?.parentNode?.contains(e.target as Node)
      ) {
        setPageState(false);
      }
    };
    window.addEventListener('click', clickOutsideBox);

    return () => window.removeEventListener('click', clickOutsideBox);
  }, []);

  return (
    <div ref={contentReference}>
      <NavLink
        to={
          active.page === title.toLowerCase() && active.subPage && subContent && subContent.length > 0
            ? `/dashboard/${active.page.toLowerCase()}/${active.subPage?.toLowerCase()}`
            : link
        }
        onClick={() => {
          setPageState((prevState) => !prevState);
        }}
      >
        <div
          className={clsx(
            SideBarCSS.sideBarButton,
            'justify-between',
            active.page === title.toLowerCase().replaceAll(' ', '-')
              ? SideBarCSS.sideBarContentActive
              : SideBarCSS.sideBarContentDefault,
            active.page === title.toLowerCase().replaceAll(' ', '-') &&
              active.subPage &&
              SideBarCSS.sideBarContentSecondaryActive,
          )}
        >
          <div className="flex gap-4 w-fit items-center">
            <Icon className={clsx('w-[18px] h-[18px]')} />
            <span className="text-body3">{title}</span>
          </div>
          {subContent && (
            <ChevonDownIcon className={clsx(SideBarCSS.chevonDownTranstion, pageState ? '' : 'rotate-180')} />
          )}
        </div>
      </NavLink>
      <div
        className={clsx('w-full overflow-hidden', pageState && subContent ? SideBarCSS.scrollAnimationDown : 'hidden')}
      >
        {subContent &&
          subContent.map((subContent) => {
            return (
              <NavLink
                key={subContent.title}
                to={subContent.link}
                onClick={() => setSubPage((prevState) => !prevState)}
              >
                <div
                  className={clsx(
                    SideBarCSS.sideBarButton,
                    active.subPage === subContent.title.toLowerCase().replaceAll(' ', '-')
                      ? SideBarCSS.sideBarContentActive
                      : SideBarCSS.sideBarContentDefault,
                  )}
                >
                  <div className="w-1/12"></div>
                  <span className="text-caption">{subContent.title}</span>
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default SideBarContent;
