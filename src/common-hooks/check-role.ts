import { Hook, HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors'

export default (role:any):Hook => {
    return (context: HookContext) => {
        if ((<any>context.params.user).role !== role) throw new BadRequest('No Auth Right', {
            message: [
                { lang: 'en', text: 'No Auth Right' },
                { lang: 'cht', text: '沒有權限' },
                { lang: 'chs', text: '没有权限' },
            ]
        })
    }
}