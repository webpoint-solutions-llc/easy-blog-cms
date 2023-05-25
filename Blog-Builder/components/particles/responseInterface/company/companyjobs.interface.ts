export interface ICompanyJob {
  _id: string;
  user: User;
  title: string;
  jobDescription: string;
  level: string;
  workExperience: number;
  location: string;
  jobTypes: any[];
  skills: any[];
  salaryRange: SalaryRange;
  remotePolicy: string;
  remoteCulture: string;
  hiringRegions: string;
  acceptRemoteWorldWide: boolean;
  company: Company;
  jobStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  _id: string;
  user: string;
  createdUser: string;
  companyName: string;
  roleDescription: string;
  logo: Logo;
  companyWebsite: string;
  location: string;
  market: Market[];
  numberOfEmployees: number;
  aboutYourProduct: string;
  reasonForChoosing: string;
  yourProduct: string;
  teamMemberEmail: string[];
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface SalaryRange {
  minSalary: number;
  maxSalary: number;
}

export interface User {
  mobileNumber: string;
  email: string;
  isActive: boolean;
}
