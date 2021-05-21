import { Application, HookContext, ServiceAddons } from '@declarations';
import { BadRequest } from '@feathersjs/errors';
import { MyService } from '@common/classes';
import * as feathersAuthentication from '@feathersjs/authentication';
import { User } from '@user-model';

const bcrypt = require('bcryptjs');
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
        checking,
        changePassword,
      ]
    }
  });
};

export interface UserInput {
  password: string,
  oldPassword: string
};

async function checking(context: HookContext<UserInput>){
  const user = <User>context.params.user;
  if (!context.data?.password || !context.data?.oldPassword) {
    throw new BadRequest('Need More Information', {
      message: [
        { lang: 'en', text: 'Need More Information' },
        { lang: 'cht', text: '需要更多資料' },
        { lang: 'chs', text: '需要更多资料' },
      ]
    });
  }
  if (!await bcrypt.compare(context.data.oldPassword, user.password)) {
    throw new BadRequest('Wrong Information', {
      message: [
        { lang: 'en', text: 'Wrong Information' },
        { lang: 'cht', text: '錯誤資料' },
        { lang: 'chs', text: '错误资料' },
      ]
    });
  }
  return context;
};

async function changePassword(context: HookContext<UserInput>){
  const user = <User>context.params.user;
  context.result = await context.app.service('users').patch(user._id, {
    password: context.data?.password,
  })
};