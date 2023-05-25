export const redirectUser = (contentParam: string) => {
  let redirect = '';
  switch (contentParam) {
    case 'drafts':
      redirect = '/dashboard/blogs/posts/?content=published';
      break;
    case 'published':
      redirect = '/dashboard/blogs/posts/?content=drafts';
      break;
    case 'trash':
      redirect = `/dashboard/blogs/posts/?content=drafts`;
      break;
    default:
      redirect = '';
      break;
  }

  return redirect;
};
