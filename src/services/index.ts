import { Application } from '../declarations';
import users from './users/service';
import admin_users from './users/admin-service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(admin_users);
}