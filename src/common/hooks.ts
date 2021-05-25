import { MyHookContext, Hook } from '@declarations';
import error from '@feathersjs/errors';
import { Role } from "@services/users/model";

export function checkRole(role:Role):Hook{
  return (context: MyHookContext) => {
    if (context.params.user?.role !== role) throw new error.NotAuthenticated('No Auth Right', {
      message: [
        { lang: 'en', text: 'No Auth Right' },
        { lang: 'cht', text: '沒有權限' },
        { lang: 'chs', text: '没有权限' },
      ]
    })
    return context
  }
};