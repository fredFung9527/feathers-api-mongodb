import { Application } from '@declarations';
import Model, { User } from './model';
import hooks from './admin-hooks';
import createServie from "feathers-mongoose";

declare module '@declarations' {
  interface ServiceTypes {
    'users/admin': MyServiceType<User>;
  }
}

export default function (app: Application): void {
  app.use('/users/admin', 
    createServie({
      Model: Model,
      lean: true,
      paginate: {
        default: 10,
        max: 100
      },
    })
  );

  const service = app.service('users/admin');

  service.hooks(hooks);
}
