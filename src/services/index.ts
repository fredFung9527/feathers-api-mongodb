import { Application } from '@declarations';
const requireContext = require('node-require-context');

export default function (app: Application): void {
  const services = requireContext("./", true, /service\.(j|t)s$/);
  services.keys().forEach((moduleId:any) => {
    app.configure(services(moduleId).default);
  });
};