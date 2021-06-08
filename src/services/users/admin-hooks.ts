import * as local from '@feathersjs/authentication-local';
import { checkRole } from '@common/hooks';
import { disablePagination } from 'feathers-hooks-common';
import { Role } from './model';
import { authenticate } from '@common/hooks';
import { MyHookContext } from '@declarations';

const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [
      authenticate('jwt'),
      checkRole(Role.Admin),
    ],
    find: [
      disablePagination()
    ],
    get: [ 
    ],
    create: [ 
      hashPassword('password') 
    ],
    update: [ 
      hashPassword('password'),
      (context: MyHookContext) => {
        if (context.data.password === '' || context.data.password == null) delete context.data.password;
        return context;
      }
    ],
    patch: [ 
      hashPassword('password') 
    ],
    remove: [ 
    ]
  },

  after: {
    all: [ 
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
