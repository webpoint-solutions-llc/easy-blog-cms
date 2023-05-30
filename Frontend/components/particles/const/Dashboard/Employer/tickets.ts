export const EmployerTicketBreadCrumbs = [
  { link: '/employer-dashboard/account/overview', title: 'Account' },
  { link: '/employer-dashboard/account/tickets', title: 'Tickets' },
];

export const ticketTabsCreateView = [
  { name: 'All Tickets', link: '/dashboard/tickets/?status=all%20tickets' },
  { name: 'Opened', link: '/dashboard/tickets/?status=Opened' },
  { name: 'Pending', link: '/dashboard/tickets/?status=Pending' },
  { name: 'Closed', link: '/dashboard/tickets/?status=Closed' },
];

export const ticketChat = (id: string) => [
  { title: 'Accounts', link: '/dashboard/home/account-setting/' },
  { title: 'Tickets', link: '/dashboard/tickets/?status=all%20tickets' },
  { title: `Ticket No. #${id}`, link: `/dashboard/tickets/conversation/${id}` },
];

export const ticketProblemType = [
  {
    value: 'Technical',
    label: 'Technical',
  },
  {
    value: 'Non-technical',
    label: 'Non-technical',
  },
  {
    value: 'Billing',
    label: 'Billing',
  },
];

export const ticketSeverityType = [
  {
    value: 'High',
    label: 'High',
  },
  {
    value: 'Medium',
    label: 'Medium',
  },
  {
    value: 'Low',
    label: 'Low',
  },
];

export const temporaryTicketHistory = [
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Closed',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Opened',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Closed',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Opened',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Closed',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Pending',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Closed',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Pending',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Closed',
  },
  {
    number: '6645',
    type: 'Technical issue',
    headline: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: 'Nov 12, 2022',
    severity: 'High',
    status: 'Closed',
  },
];
