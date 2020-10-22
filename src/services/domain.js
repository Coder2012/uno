import { createDomain } from 'effector'
import { attachLogger } from 'effector-logger/attach'

export const domain = createDomain('$$')
process.env.NODE_ENV === 'development' && attachLogger(domain, {inspector: 'disabled', reduxDevtools: 'disabled'});
