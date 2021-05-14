import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { setField } from 'feathers-authentication-hooks';
import { disallow }from 'feathers-hooks-common';

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [ 
      authenticate('jwt'),
      setField({ from: 'params.user._id', as: 'params.query._id'})
    ],
    get: [ 
      authenticate('jwt'), 
      disallow('external') 
    ],
    create: [ 
      hashPassword('password') 
    ],
    update: [ 
      hashPassword('password'), 
      authenticate('jwt'), 
      setField({ from: 'params.user._id', as: 'params.query._id'}) 
    ],
    patch: [ 
      hashPassword('password'), 
      authenticate('jwt'), 
      setField({ from: 'params.user._id', as: 'params.query._id'})
    ],
    remove: [ 
      authenticate('jwt'), 
      setField({ from: 'params.user._id', as: 'params.query._id'}) 
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
