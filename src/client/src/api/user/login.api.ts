import { Login } from 'shared/interface/user/login.interface';
import { BaseUserInfo } from 'shared/interface/user/user-info.interface';
import { request } from '..';

interface LoginParams extends Login {}

interface LoginResult extends BaseUserInfo {}

export function apiLogin(data: LoginParams) {
  return request<LoginResult>('post', '/auth/login', data);
}
