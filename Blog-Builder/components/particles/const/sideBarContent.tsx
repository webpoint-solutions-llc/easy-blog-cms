import ChatIcon from '@atoms/icons/Chat-Icon';
import UsersIcon from '@atoms/icons/Users-Icon';
import { ISideBarContent } from '@organisms/Dashboard/Body-Layout/Side-Bar';

export const sideBarContent: ISideBarContent[] = [
  {
    title: 'Blogs',
    icon: ChatIcon,
    link: '/dashboard/blogs/overview/',
    subContent: [
      {
        title: 'Overview',
        link: '/dashboard/blogs/overview/',
      },
      {
        title: 'Posts',
        link: '/dashboard/blogs/posts/?content=published&pageNo=1',
      },
      {
        title: 'Categories',
        link: '/dashboard/blogs/categories/',
      },
      {
        title: 'Media',
        link: '/dashboard/blogs/media/',
      },
    ],
  },
  {
    title: 'Users',
    icon: UsersIcon,
    link: '/dashboard/users/users-details/',
    subContent: [
      {
        title: 'Users Details',
        link: '/dashboard/users/users-details/',
      },
      // Temporarily removed!
      // {
      //   title: 'Roles and Permissions',
      //   link: '/dashboard/users/roles-and-permissions/',
      // },
    ],
  },
];
