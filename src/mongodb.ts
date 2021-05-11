import { MongoClient } from 'mongodb';
import { Application } from './declarations';
import mongoose from 'mongoose'

export default function (app: Application): void {
  const connection = app.get('mongodb');
  mongoose.connect(connection);

/*   const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
    .then(client => client.db(database));

  app.set('mongoClient', mongoClient); */
}
