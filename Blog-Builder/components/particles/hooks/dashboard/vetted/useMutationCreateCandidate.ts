import api from '@particles/helper/api';
import { convertJsonToFormData } from '@particles/helper/jsonToFormData';

interface ICreateVettedCandidate {
  email: string;
  fullName: string;
  role: string;
  file_cv: File;
  file_profile?: File;
  profile: Partial<IProfile>;
}

interface IProfile {
  skills: string[];
  secondarySkills: string[];
  location: string;
  linkedinProfile: string;
  yourWebsite: string;
  description: string;
  roleDescription: string;
  companyName: string;
  isStudent: boolean;
  yearOfExperience: number;
  jobPreference: JobPreference;
}

interface JobPreference {
  jobSearchStatus: string;
  intrestedJob: string;
  switchTime: string;
  salaryType: string;
  desiredSalary: string;
  roleLookingFor: string;
  perferedLocation: string;
  openToWorkRemotely: string;
}

export const useMutationCreateCandidate = () => {
  const postRecommendation = async (dataPost: ICreateVettedCandidate) => {
    const baseURL = import.meta.env.VITE_BACKEND_HOST;

    try {
      await api.patch(baseURL + '/userProfiles/upload-vetted-candidate', convertJsonToFormData(dataPost));

      return 'Data Updated Successfully!';
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  return postRecommendation;
};

export default useMutationCreateCandidate;
