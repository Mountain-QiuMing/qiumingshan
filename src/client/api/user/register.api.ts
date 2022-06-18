import { Register } from 'shared/interface/user/register.interface';
import { request } from '..';

interface RegisterParams extends Register {}

export function apiRegister(data: RegisterParams) {
  return request('post', '/auth/register', data);
}
