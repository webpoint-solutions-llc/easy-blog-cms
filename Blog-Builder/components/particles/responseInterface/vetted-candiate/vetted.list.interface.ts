export interface ApplyJob {
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

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}
