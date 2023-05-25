import api from './api';
import jwt_decode from 'jwt-decode';
import removeFromLocalStorage from './removeFromLocal';

import { IUser } from '@particles/responseInterface/user/user.list.interface';

export async function fetchRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  const req = await api.post('/refresh', {
    refreshToken: refreshToken,
  });
  const user = await jwt_decode(req.data.data.accessToken);

  return user;
}

export async function logout() {
  removeFromLocalStorage('accessToken');
  removeFromLocalStorage('refreshToken');
}

export function getUserFromJwt(): IUser {
  const token = localStorage.getItem('accessToken');
  const user: IUser = jwt_decode(token as string);

  return user;
}
