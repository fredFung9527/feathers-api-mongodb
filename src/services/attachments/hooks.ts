import { setField } from 'feathers-authentication-hooks';
import { disallow } from 'feathers-hooks-common';
import { authenticate } from '@common/hooks';
import { metaHook } from '@common/hooks'

export default {
  before: {
    all: [],
    find: [ 
      authenticate('jwt'),
      setField({ from: 'params.user._id', as: 'params.query.user'}),
    ],
    get: [ 
      authenticate('jwt'),
      setField({ from: 'params.user._id', as: 'params.query.user'}),
    ],
    create: [
      authenticate('jwt'),
      setField({ from: 'params.user._id', as: 'data.user'}),
      metaHook()
    ],
    update: [ 
      disallow('external')
    ],
    patch: [
      disallow('external')
    ],
    remove: [ 
      disallow('external')
    ]
  },

  after: {
    all: [],
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
