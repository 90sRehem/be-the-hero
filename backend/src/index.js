const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const app = express()

app.use(cors(
    // origin: ''
))
app.use(express.json())
app.use(routes)

app.listen(3333)