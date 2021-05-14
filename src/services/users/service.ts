import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import Model, { IUser } from './model';
import hooks from './hooks';
const createServie = require('feathers-mongoose');

declare module '../../declarations' {
  interface ServiceTypes {
    'users': IUser & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  app.use('/users', 
    createServie({
      Model: Model,
      lean: true,
      paginate: {
        default: 1,
        max: 1
      },
    })
  );

  const service = app.service('users');

  service.hooks(hooks);
}
