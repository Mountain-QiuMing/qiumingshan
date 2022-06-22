import { EditableUserInfo } from 'shared/interface/user/editable-user-info.interface';
import { request } from '..';

export function apiGetUserInfo() {
  return request('get', '/auth/info');
}

interface UpdateUserInfoParams extends EditableUserInfo {}

export function apiUpdateUserInfo(user: UpdateUserInfoParams) {
  return request('put', '/auth/update', user);
}
