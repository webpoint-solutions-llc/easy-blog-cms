export interface ITicket {
  _id: string;
  subject: string;
  problemType: string;
  severityLevel: string;
  additionalInfo: string;
  ticketNumber: string;
  status: string;
  createdBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InputTicket {
  status: string;
}

export interface IMessageThread {
  _id: string;
  message: string;
  sendBy: ISendBy;
  isCurrentUser: boolean;
  file?: File;
  ticket: ITicket;
  createdAt: string;
  updatedAt: string;
}

interface ISendBy {
  _id: string;
  fullName: string;
  salt: string;
  photo: Photo;
}

interface Photo {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
}
export interface File {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
  createdDate: string;
  uploadedBy: string;
  dimension: Dimension;
  size: number;
}

export interface Dimension {
  height: number;
  width: number;
}
