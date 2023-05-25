export const AttachmentBreadcrumbs = (id: number) => {
  return [
    {
      title: 'Blogs',
      link: '/dashboard/blogs/overview/',
    },
    {
      title: 'Media',
      link: '/dashboard/blogs/media/',
    },
    {
      title: 'Attachment Details',
      link: `/dashboard/blogs/media/attachment-details/${id}`,
    },
  ];
};
