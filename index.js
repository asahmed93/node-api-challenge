const express = require('express')
const actionRouter = require('./router/actionRouter');
const projectRouter = require('./router/projectRouter')

const server = express()
server.use(express.json())

server.use('/actions', actionRouter)
server.use('/projects', projectRouter)

module.exports = server