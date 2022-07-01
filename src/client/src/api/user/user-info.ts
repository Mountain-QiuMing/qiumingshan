import { EditableUserInfo } from 'shared/interface/user/editable-user-info.interface';
import { BaseUserInfo } from 'shared/interface/user/user-info.interface';
import { request } from '..';

export function apiGetUserInfo() {
  return request('get', '/auth/info');
}

export function apiGetUserInfoByName(username: string) {
  return request<BaseUserInfo>('get', `/user/username/${username}`);
}

interface UpdateUserInfoParams extends EditableUserInfo {}

export function apiUpdateUserInfo(user: UpdateUserInfoParams) {
  return request('put', '/auth/update', user);
}
