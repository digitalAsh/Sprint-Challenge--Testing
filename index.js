require('dotenv').config();

const server = require('./api/server.js')

const port = process.env.PORT || 5000; ////we need a default port and a port to work with whatever port heroku assigns  //looks for PORT if not there it will be 5000
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));