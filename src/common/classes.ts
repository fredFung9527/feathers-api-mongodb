import { ServiceMethods, Params, Id, NullableId } from "@feathersjs/feathers";
import { Application } from "@declarations";

export {
  ServiceMethods
}

export class MyService implements ServiceMethods<any> {
  async find(params: Params) {
    return [];
  }
  async get(id: Id, params: Params) {}
  async create(data: any, params: Params) {}
  async update(id: NullableId, data: any, params: Params) {}
  async patch(id: NullableId, data: any, params: Params) {}
  async remove(id: NullableId, params: Params) {}
  setup(app: Application, path: string) {}
}
