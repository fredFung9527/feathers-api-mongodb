import { Application as ExpressFeathers } from '@feathersjs/express';
import { Hook, HookContext, ServiceAddons, ServiceMethods, Paginated, Params, Service } from '@feathersjs/feathers';
import { User } from '@user-model';

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}
// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;

// re-export
export {
    Hook,
};

export interface MyParams extends Params { 
    user?: {[key: string]: any} | User
}
export interface MyHookContext<T = any, S = Service<T>> extends HookContext<T, S> { 
    params: MyParams 
}

export interface ModelTypes {}
export interface PaginatedTypes {}

export type MyPaginated<T> = Paginated<T>;
export type MyServiceType<T> = ServiceAddons<T> & ServiceMethods<T>;
