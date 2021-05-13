import { Application } from '../declarations';
const requireContext = require('node-require-context')
import _ from "lodash"
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  const services = requireContext("./", true, /\.service\.ts$/);
  _.forEach(services.keys(), moduleId => {
    app.configure(services(moduleId).default);
  });
}
