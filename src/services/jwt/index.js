import jwt from 'jsonwebtoken'
import Promise from 'bluebird'

const jwtSecret = 'PKL7EjEtYmjPCZten6HgWHcGnbjTPBIM'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) =>
  method({ id }, jwtSecret, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)



