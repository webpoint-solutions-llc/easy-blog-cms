import { useMutation, useQuery } from '@tanstack/react-query';

import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { convertJsonToFormData } from '@particles/helper/jsonToFormData';
import axios from 'axios';
import api from '@particles/helper/api';

interface ICreateVettedCandidate {
  email: string;
  password: string;
  fullName: string;
  currentRole: string;
  skills: string[];
  resumeFile: File;
  profileImage: File;
}

export const useMutationChangeVettedStatus = () => {
  const changeStatus = async (dataPost: boolean, id: string) => {
    const baseURL = import.meta.env.VITE_BACKEND_HOST;

    try {
      await api.patch(baseURL + '/userProfiles/update-vetted-status', {
        userId: id,
        isVetted: dataPost,
      });

      return 'Data Updated Successfully!';
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  return changeStatus;
};

export default useMutationChangeVettedStatus;
