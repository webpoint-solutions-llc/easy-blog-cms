import FileDownload from 'js-file-download';
import { useMutation, useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';

export const getBlogs = async () => {
  try {
    const { data } = await api.get('/blog/blog.export', {
      responseType: 'blob',
    });

    FileDownload(data, 'report.csv');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationBlogExport = () => {
  return useMutation({
    mutationFn: () => getBlogs(),
  });
};

export default useMutationBlogExport;
