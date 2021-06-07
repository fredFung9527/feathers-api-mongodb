import { Application } from '@declarations';
import Model, { Attachment } from './model';
import hooks from './hooks';
import createServie from "feathers-mongoose";
const { authenticate } = require('@feathersjs/express');
import multer from 'multer';
import fs from 'fs';

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
    destination: (req: any, file: Express.Multer.File, cb) => {
      const userID: string = req.user._id;
      const dir = `public/attachments/${userID ? userID : 'no-user'}`;
      if (fs.existsSync(dir)) {
        cb(null, 'public/attachments/' + req.user._id)
      } else {
        fs.mkdir(dir, error => cb(error, dir));
      }
    },
    filename: (req, file: Express.Multer.File, cb) => {
      cb(null, `${req.body?.tag || 'common'}-${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({
    storage,
    limits: {
      fileSize: 1e+7,
    },
    fileFilter: (req, file: Express.Multer.File, cb) => {
      if (file.mimetype.includes('image')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });

  app.use('/attachments',
    authenticate('jwt'),
    upload.single('file'), 
    (req, res, next) => {
      if (!req.file) throw new Error('No file attached / Invalid file type');
      if (req.method === 'POST') {
        req.body = {
          description: req.body.description,
          tag: req.body.tag,
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
