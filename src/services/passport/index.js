
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import db from '../../models'

const User = db.user

const jwtSecret = 'PKL7EjEtYmjPCZten6HgWHcGnbjTPBIM'

export const token = ({
  required
  // register = true
} = { /*register: true*/ }) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user)) {
      return res.status(401).end()
    }

    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)


passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  User.findOne({where: { id: id } }).then((user) => {
    //console.log('user', user)
    done(null, user)
    return null
  }).catch(done)
})
)
