const express = require('express')
const actionRouter = require('./router/actionRouter');
const projectRouter = require('./router/projectRouter')

const server = express()
server.use(express.json())

server.use('/actions', actionRouter)
server.use('/projects', projectRouter)

const port = 5000;

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})

module.exports = server