import FileDownload from 'js-file-download';
import { useMutation, useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';

export const getUsersExport = async () => {
  try {
    const { data } = await api.get('/admin/user/user.export', {
      responseType: 'blob',
    });

    FileDownload(data, 'user_report.csv');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationUserExport = () => {
  return useMutation({
    mutationFn: () => getUsersExport(),
  });
};

export default useMutationUserExport;
