export const blogCategoriesNavigation = [
  {
    title: 'Blogs',
    link: '/dashboard/blogs/overview',
  },
  {
    title: 'Categories',
    link: '/dashboard/blogs/categories',
  },
];

export const blogCategoriesAddNavigation = (addNew: boolean) => {
  if (addNew) {
    return [
      {
        title: 'Blogs',
        link: '/dashboard/blogs/overview',
      },
      {
        title: 'Categories',
        link: '/dashboard/blogs/categories',
      },
      {
        title: 'Add New Categories',
        link: '/dashboard/blogs/categories/add-new-category',
      },
    ];
  }

  return [
    {
      title: 'Blogs',
      link: '/dashboard/blogs/overview',
    },
    {
      title: 'Categories',
      link: '/dashboard/blogs/categories',
    },
    {
      title: 'Edit Categories',
      link: '/dashboard/blogs/categories/:id',
    },
  ];
};
