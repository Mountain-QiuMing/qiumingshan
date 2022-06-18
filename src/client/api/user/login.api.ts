import { Login } from 'shared/interface/user/login.interface';
import { request } from '..';

interface LoginParams extends Login {}

export function apiLogin(data: LoginParams) {
  return request('post', '/auth/login', data);
}
