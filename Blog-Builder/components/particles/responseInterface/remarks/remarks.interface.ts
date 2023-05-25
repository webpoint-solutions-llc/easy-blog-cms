export interface RecommendedUser {
  _id: string;
  user: User;
  userProfile: UserProfile;
  job: Job;
  applicationStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface Job {
  _id: string;
  user: string;
  title: string;
  jobDescription: string;
  workExperience: number;
  location: string;
  level: string;
  jobTypes: string[];
  skills: Skill[];
  salaryRange: SalaryRange;
  remotePolicy: string;
  remoteCulture: string;
  hiringRegions: string;
  acceptRemoteWorldWide: boolean;
  company: string;
  jobStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface SalaryRange {
  currency: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
}

interface UserProfile {
  _id: string;
  user: string;
  isVetted: boolean;
  culture: any[];
  resume: any[];
  createdAt: string;
  updatedAt: string;
  jobPreference: JobPreference;
  profile: Profile;
}

interface Profile {
  isStudent: boolean;
  location: string;
  description: string;
  yearOfExperience: string;
  currentlyEmployed: boolean;
  skills: Skill[];
  roleDescription: string;
  _id: string;
}

interface Skill {
  _id: string;
  title: string;
  isSystemGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  photo: Photo;
  password: string;
  passwordExpired: string;
  salt: string;
  isActive: boolean;
  isEmailVerified: boolean;
  googleSignIn: boolean;
  linkedinSignIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
}

interface JobPreference {
  jobSearchStatus: string;
  intrestedJob: string;
  salaryType: string;
  desiredSalary: string;
  switchTime: string;
  roleLookingFor: string[];
  perferedLocation: string;
  openToWorkRemotely: boolean;
}
