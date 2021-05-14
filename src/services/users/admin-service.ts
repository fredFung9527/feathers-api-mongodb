import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import Model, { User } from './model';
import hooks from './admin-hooks';
const createServie = require('feathers-mongoose');

declare module '../../declarations' {
  interface ServiceTypes {
    'users-admin': User & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  app.use('/users-admin', 
    createServie({
      Model: Model,
      lean: true,
      paginate: {
        default: 10,
        max: 100
      },
    })
  );

  const service = app.service('users-admin');

  service.hooks(hooks);
}