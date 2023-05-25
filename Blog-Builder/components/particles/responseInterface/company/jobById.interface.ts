export interface IJobById {
  statusCode: number;
  message: string;
  metadata: Metadata;
  data: Data;
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
  title: string;
  jobDescription: string;
  workExperience: number;
  location: string;
  level: string;
  jobTypes: JobType[];
  skills: Skill[];
  secondarySkills: Skill[];
  salaryRange: SalaryRange;
  remotePolicy: string;
  remoteCulture: string;
  hiringRegions: string;
  acceptRemoteWorldWide: boolean;
  company: Company;
  jobStatus: string;
  createdAt: string;
  updatedAt: string;
  applicants: number;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
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

export interface JobType {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  title: string;
  isSystemGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SalaryRange {
  currency: string;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
}

export interface Company {
  _id: string;
  user: string;
  createdUser: string;
  companyName: string;
  contactNumber: string;
  roleDescription: string;
  logo: Logo;
  location: string;
  market: Market[];
  numberOfEmployees: string;
  aboutYourProduct: string;
  reasonForChoosing: string;
  yourProduct: string;
  teamMemberEmail: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Logo {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
}

export interface Market {
  _id: string;
  title: string;
  isSystemGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}
