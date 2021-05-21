import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '@declarations';
import Model, { User } from './model';
import hooks from './hooks';
import createServie from "feathers-mongoose";

declare module '@declarations' {
  interface ServiceTypes {
    'users': User & ServiceAddons<any>;
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
