import { useMutation } from '@tanstack/react-query';

import api from '@particles/helper/api';

type ApplyJob = {
  job: string;
  user: string | number;
};
export const postRecommended = async ({ user, job }: ApplyJob) => {
  try {
    const { data } = await api.post(`/applications/recommendedbyadmin`, {
      job: job,
      user: user,
    });

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationRecommendCandidate = () => {
  return useMutation({
    mutationFn: (applyJob: ApplyJob) => postRecommended(applyJob),
  });
};

export default useMutationRecommendCandidate;
