import express from 'express'
import { json, urlencoded } from 'body-parser'
import { connect } from './db/db'
import router from './router'

export const app = express()
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
