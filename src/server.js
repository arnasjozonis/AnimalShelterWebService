import express from 'express'
import { json, urlencoded } from 'body-parser'
import { connect } from './db/db'
import router from './router'
import expressSwagger from 'express-swagger-generator'

const app = express()
const swagger = expressSwagger(app)

let options = {
  swaggerDefinition: {
    info: {
      description: 'Animal shelters web service',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/shelter',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, // app absolute path
  files: ['./router.js'] // Path to the API handle folder
}
swagger(options)

const port = process.env.PORT || 3000
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api/shelter', router)

export const start = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
