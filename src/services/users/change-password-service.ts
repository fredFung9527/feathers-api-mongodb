import { Application, HookContext, ServiceAddons } from '@declarations';
import { BadRequest } from '@feathersjs/errors';
import { MyService } from '@common/classes';
import * as feathersAuthentication from '@feathersjs/authentication';
import { User } from '@user-model';

const { authenticate } = feathersAuthentication.hooks;

export default function (app: Application): void {    
  app.use('/change-password', new MyService());
  
  const service:ServiceAddons<any> = app.service('change-password');

  service.hooks({
    before: {
      all: [
        authenticate('jwt')
      ],
      create: [
        changePassword,
      ]
    }
  });
};

export interface UserInput {
  password: string,
};

async function changePassword(context: HookContext<UserInput>){
  const user = <User>context.params.user;
  if (!context.data?.password) {
    throw new BadRequest('Need More Information', {
      message: [
        { lang: 'en', text: 'Need More Information' },
        { lang: 'cht', text: '需要更多資料' },
        { lang: 'chs', text: '需要更多资料' },
      ]
    });
  }
  context.result = await context.app.service('users').patch(user._id, {
    password: context.data?.password,
  })
};