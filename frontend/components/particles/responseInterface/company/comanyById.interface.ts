export interface ICompanyGetRoot {
  statusCode: number;
  message: string;
  metadata: Metadata;
  data: ICompanyDetail;
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

export interface ICompanyDetail {
  _id: string;
  user: User;
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
  createdAt: string;
  updatedAt: string;
}

export interface User {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  isActive: boolean;
  photo: Photo;
}

export interface Photo {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
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
