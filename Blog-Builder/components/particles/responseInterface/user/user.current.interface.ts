export interface IUserCurrent {
  statusCode: number;
  message: string;
  metadata: Metadata;
  data: User;
}

export interface Metadata {
  languages: string[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
  repoVersion: string;
}

export interface Data {
  _id: string;
  user: User;
  profile: Profile;
  isVetted: boolean;
  culture: any[];
  resume: Resume[];
  createdAt: string;
  updatedAt: string;
  jobPreference: JobPreference;
  resumeDownloadCount: number;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
  password: string;
  passwordExpired: string;
  salt: string;
  isActive: boolean;
  isEmailVerified: boolean;
  googleSignIn: boolean;
  linkedinSignIn: boolean;
  createdAt: string;
  updatedAt: string;
  photo: Photo;
  mobileNumber: string;
}

export interface Photo {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
}

export interface Profile {
  location: string;
  dateOfBirth: string;
  gender: string;
  yearOfExperience: number;
  linkedinProfile: string;
  yourWebsite: string;
  companyName: string;
  isStudent: boolean;
  currentlyEmployed: boolean;
  skills: Skill[];
  secondarySkills: any[];
  roleDescription: string;
  _id: string;
}

export interface Skill {
  _id: string;
  title: string;
  isSystemGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
  isActive: boolean;
  accessFor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  path: string;
  pathWithFilename: string;
  originalFileName: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
  createdDate: string;
  _id: string;
}

export interface JobPreference {
  jobSearchStatus: string;
  intrestedJob: string;
  desiredSalary: number;
  roleLookingFor: RoleLookingFor[];
  perferedLocation: string;
  openToWorkRemotely: boolean;
}

export interface RoleLookingFor {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
