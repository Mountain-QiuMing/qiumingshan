import { define } from 'typeorm-seeding';

import { RoleEnum } from 'shared/constants/role.enum';
import { UserEntity } from '../modules/user/user.entity';

define(UserEntity, () => {
  const user = new UserEntity();
  user.username = 'admin';
  user.nickname = '管理员';
  user.role = RoleEnum.ADMIN;
  user.password = '123456';

  return user;
});
