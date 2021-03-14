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
    basePath: '/api',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
  },
  basedir: __dirname,
  files: ['./router.js', './models/**.js']
}
swagger(options)

const port = process.env.PORT || 3000
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api/shelters', router)

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
