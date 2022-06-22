import { RoleEnum } from '../../constants/role.enum';
import { ThemeEnum } from '../../constants/theme.enum';

export interface EditableUserInfo {
  avatar?: string;
  nickname?: string;
  role?: RoleEnum;
  theme?: ThemeEnum;
  password?: string;
}
