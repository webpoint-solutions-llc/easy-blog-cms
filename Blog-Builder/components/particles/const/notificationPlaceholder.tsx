import Jack from '@particles/images/notification-placeholder-2.png';
import Clair from '@particles/images/notification-placeholder-1.png';
import Light from '@particles/images/notification-placeholder-3.png';

export const notifications = [
  {
    image: Clair,
    user: 'Clair McLane',
    content: 'blog',
    name: 'The surprising benifits of technology',
    time: '1 min ago',
    read: true,
  },
  {
    user: 'Ricardo Jackson',
    content: 'join',
    time: 'Dec 17, 2023',
    read: true,
  },
  {
    image: Jack,
    user: 'Jack Torrence',
    content: 'blog',
    name: 'The Shining',
    time: 'Dec 10, 2023',
    read: false,
  },
  {
    image: Light,
    user: 'Light Yagami',
    content: 'join',
    time: 'Sept 6, 2022',
    read: false,
  },
];

export const contentPlaceholder = {
  blog: 'just published a blog',
  join: 'just joined the network',
};
