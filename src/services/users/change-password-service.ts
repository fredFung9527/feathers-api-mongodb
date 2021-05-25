import { Application, MyHookContext } from '@declarations';
import { BadRequest } from '@feathersjs/errors';
import { MyService, ServiceMethods } from '@common/classes';
import * as feathersAuthentication from '@feathersjs/authentication';

const bcrypt = require('bcryptjs');
const { authenticate } = feathersAuthentication.hooks;

export default function (app: Application): void {    
  app.use('/change-password', new MyService());
  
  const service:ServiceMethods<any> = app.service('change-password');

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

async function checking(context: MyHookContext<UserInput>){
  if (!context.data?.password || !context.data?.oldPassword) {
    throw new BadRequest('Need More Information', {
      message: [
        { lang: 'en', text: 'Need More Information' },
        { lang: 'cht', text: '需要更多資料' },
        { lang: 'chs', text: '需要更多资料' },
      ]
    });
  }
  if (!await bcrypt.compare(context.data.oldPassword, context.params.user?.password)) {
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

async function changePassword(context: MyHookContext<UserInput>){
  context.result = await context.app.service('users').patch(context.params.user?._id, {
    password: context.data?.password,
  })
};