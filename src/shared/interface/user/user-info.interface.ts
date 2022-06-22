import { RoleEnum } from 'shared/constants/role.enum';

export interface BaseUserInfo {
  avatar?: string;
  createTime: string;
  id: string;
  lastLoginTime?: string;
  nickname?: string;
  role: RoleEnum;
  token: boolean;
  updateTime: boolean;
  url: boolean;
  username: string;
  verified: boolean;
}
