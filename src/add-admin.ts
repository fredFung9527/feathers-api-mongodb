import 'module-alias/register';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import mongodb from './mongodb';
import users from './services/users/service';
import { Application } from './declarations';
import authentication from './authentication';
import { Role } from './services/users/model';
import { PaginatedTypes } from './declarations'

const app: Application = express(feathers());
app.configure(configuration());
app.configure(mongodb);
app.configure(authentication);
app.configure(users);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const main = async () => {
  await setTimeout(() =>{}, 500);
  readline.question('Please enter email?', (email:string) => {
    readline.question('Please enter password?', async (password:string) => {
      readline.close();
  
      try {
        const result = <PaginatedTypes['users']>await app.service('users').find({
          query: { 
            email: email,
          }
        });
        const currentID =  result.data[0]?._id;
        if (currentID) {
          await app.service('users').patch(currentID, {
            password: password,
            role: Role.Admin
          });
          console.log(`Updated ${email}: ${currentID}`);
        } else {
          await app.service('users').create({
            email: email,
            password: password,
            role: Role.Admin
          });
          console.log(`Created ${email}`)
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        process.exit(0);
      }
    });
  });
};
  
main();