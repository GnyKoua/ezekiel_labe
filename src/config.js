/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: '/api',
    database: {
      HOST: 'localhost',
      USER: "root",
      PASSWORD: "root",
      DB: "pickdeli",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },
  test: {

  },
  development: {
    baseUrl: 'localhost:8080/api',
    database: {
      HOST: 'localhost',
      USER: "root",
      PASSWORD: "root",
      DB: "pickdeli",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },
  production: {
    baseUrl: 'localhost:8080/api',
    ip: '127.0.0.1' || undefined,
    port: 8080 || 8080,
    database: {
      HOST: 'localhost',
      USER: "root",
      PASSWORD: "root",
      DB: "pickdeli",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }

  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
