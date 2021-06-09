# feathers-api-mongodb

> REST API using [Feathers](http://feathersjs.com) and [mongodb](https://www.mongodb.com/)
> Support Central Authentication

## Start the API

1. Install packages: `yarn` or `npm install`
2. For local development: `yarn dev` or `npm run dev`
3. For production: `yarn build` and then `yarn start` or `npm build` and then `npm start`
4. To add an admin user: `yarn add-admin-dev` or `yarn add-admin`, and then input email and password

## Tutoral
Hint: all files with appendix 'service.ts' in `./src/services` will be automatically configured and registered to the app

1. Add a new table with name {newTable}
* create a new folder named `newTables` in `./src/services`
* copy `model.ts` in `./src/services/users` to `./src/services/newTables`, and then modify corresponding schema and typescript interface, replace all 'User' with 'NewTable'
* copy `service.ts` in `./src/services/users` to `./src/services/newTables`
* copy `hooks.ts` in `./src/services/users` to `./src/services/newTables`

2. Add an API without table
* reference to `./src/services/users/change-password-service`

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
