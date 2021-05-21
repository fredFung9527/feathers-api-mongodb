import { Hook, HookContext } from '@declarations';
import { BadRequest } from '@feathersjs/errors';
import { Role, User } from "@services/users/model";

export function checkRole(role:Role):Hook{
  return (context: HookContext) => {
    if ((<User>context.params.user).role !== role) throw new BadRequest('No Auth Right', {
      message: [
        { lang: 'en', text: 'No Auth Right' },
        { lang: 'cht', text: '沒有權限' },
        { lang: 'chs', text: '没有权限' },
      ]
    })
  }
};