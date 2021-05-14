var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

// const MongoClient = require('mongodb').MongoClient;
// import config from './config.js'

// const connection = app.get('mongodb');
// const database = connection.substr(connection.lastIndexOf('/') + 1);
// const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
//   .then(client => client.db(database));

// mongoClient.close();