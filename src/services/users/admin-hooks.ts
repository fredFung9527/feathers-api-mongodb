import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import checkRole from '../../common-hooks/check-role'
import { disablePagination }from 'feathers-hooks-common';
import { Role } from './model'

const { authenticate } = feathersAuthentication.hooks;
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
      hashPassword('password') 
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
