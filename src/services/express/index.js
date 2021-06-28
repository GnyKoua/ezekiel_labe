import express from 'express'
import {
  env
} from '../../config'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import compression from 'compression';
import {
  compile,
  headersSent
} from '../../utils/morgan';
import bodyParser from 'body-parser';
import {
  errorHandler as queryErrorHandler
} from 'querymen';
import {
  errorHandler as bodyErrorHandler
} from 'bodymen';
import fileUpload from 'express-fileupload'
import db from '../../NewModels';
const http = require('http')

export default (apiRoot, routes) => {
  const app = express();
  db.sequelize.sync();
  const server = http.createServer(app);

  app.set('views', path.resolve('./src/views'))
  app.set('view engine', 'ejs')

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(fileUpload())
    app.use(compression())

    app.use(morgan(function developmentFormatLine(tokens, req, res) {
      // get the status code if response written
      var status = headersSent(res) ?
        res.statusCode :
        undefined

      // get status color
      var color = status >= 500 ? 31 // red
        :
        status >= 400 ? 33 // yellow
        :
        status >= 300 ? 36 // cyan
        :
        status >= 200 ? 32 // green
        :
        0 // no color

      // get colored function
      var fn = developmentFormatLine[color]

      if (!fn) {
        // compile
        fn = developmentFormatLine[color] = compile('\x1b[0m:method :url \x1b[' +
          color + 'm:status\x1b[0m :response-time ms - :res[content-length]\x1b[0m')
      }

      const string = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ].join(' ')

      //postSystemQueryLog({ queryString: string, userid: req.user ? req.user.id : '' })

      return fn(tokens, req, res)
    }))
  }

  app.use(express.static(path.join(__dirname, '../../views/static')))
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json({
    strict: false
  }))
  app.use(apiRoot, routes)

  return app

}
