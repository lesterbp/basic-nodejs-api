import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as glossaryHandler from 'handlers/glossaryHandler'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log(`${req.method}::${req.url}::${JSON.stringify(req.body)}`)
  next()
})

app.use(cors())
app.get(glossaryHandler.getTerms)
