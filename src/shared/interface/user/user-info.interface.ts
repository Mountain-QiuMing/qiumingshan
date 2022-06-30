import { RoleEnum } from 'shared/constants/role.enum';
import { ThemeEnum } from '../../constants/theme.enum';
import { Socket } from 'socket.io-client';

export interface BaseUserInfo {
  avatar?: string;
  createTime: string;
  id: string;
  lastLoginTime?: string;
  nickname?: string;
  role: RoleEnum;
  theme: ThemeEnum;
  token: string;
  updateTime: string;
  url: string;
  username: string;
  verified: boolean;
  socket?: Socket;
  socketId: string | null;
}
