import { MyHookContext, Hook } from '@declarations';
import error from '@feathersjs/errors';
import { Role } from "@services/users/model";
import * as feathersAuthentication from '@feathersjs/authentication';

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

export function metaHook():Hook{
  return (context: MyHookContext) => {
    context.data.createdAt = new Date();
    context.data.updatedAt = new Date();
    return context
  }
};

export function centralAuthenticte(method:string):Hook {
  return feathersAuthentication.hooks.authenticate({
    service: '/central-authentication',
    strategies: [method]
  });
};

export function authenticate(method:string):Hook {
  return feathersAuthentication.hooks.authenticate(method);
};