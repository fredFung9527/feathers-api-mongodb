import { Application } from '@declarations';
import Model, { Attachment } from './model';
import hooks from './hooks';
import createServie from "feathers-mongoose";
const { authenticate } = require('@feathersjs/express');
import multer from 'multer';

declare module '@declarations' {
  interface ServiceTypes {
    'attachments': MyServiceType<Attachment>;
  }
  interface ModelTypes {
    'attachments': Attachment
  }
  interface PaginatedTypes {
    'attachments': MyPaginated<Attachment>
  }
};

export default function (app: Application): void {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'public/attachments'),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  });
  const upload = multer({
    storage,
    limits: {
      fileSize: 1e+7,
    }
  });

  app.use('/attachments',
    authenticate('jwt'),
    upload.single('file'), 
    (req: any, _res, next) => {
      if (req.method === 'POST') {
        req.body = {
          description: req.body.description,
          name: req.file.originalname,
          path: req.file.path,
        };
      }
      next();
    },
    createServie({
      Model: Model,
      lean: true,
      paginate: {
        default: 1,
        max: 1
      }
    })
  );

  const service = app.service('attachments');

  service.hooks(hooks);
};
