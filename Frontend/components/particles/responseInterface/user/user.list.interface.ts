export interface IUser {
  _id: string;
  fullName: string;
  mobileNumber?: string;
  email: string;
  isActive: boolean;
  isEmailVerified: boolean;
  googleSignIn: boolean;
  linkedinSignIn: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalBlogs: number;
  lastLogin: Date;
  token?: IToken;
  role: IRole;
  photo: IFile;
}

export interface IToken {
  token: string;
  createdAt: Date;
}

export interface IRole {
  _id: string;
  name: string;
  permissions: string[];
  isActive: boolean;
  accessFor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFile {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
  createdDate: Date;
  uploadedBy: string;
  alt: string;
  title: string;
  description: string;
  dimension: Dimension;
  size: number;
}

export interface Dimension {
  height: number;
  width: number;
}
