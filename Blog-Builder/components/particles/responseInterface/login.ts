export interface IAdminLogin {
  metadata: Metadata2;
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface Metadata2 {
  statusCode: number;
}
