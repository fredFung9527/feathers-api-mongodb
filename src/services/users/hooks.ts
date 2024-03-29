import * as local from '@feathersjs/authentication-local';
import { setField } from 'feathers-authentication-hooks';
import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import { authenticate } from '@common/hooks';

const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [ 
      authenticate('jwt'),
      setField({ from: 'params.user._id', as: 'params.query._id'}),
    ],
    get: [ 
      authenticate('jwt'),
      setField({ from: 'params.user._id', as: 'params.query._id'}),
    ],
    create: [ 
      hashPassword('password'),
      iff(isProvider('external'), discard('role')),
    ],
    update: [ 
      disallow('external')
    ],
    patch: [
      iff(isProvider('external'), discard('password', 'role')),
      authenticate('jwt'),
      hashPassword('password'),
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
