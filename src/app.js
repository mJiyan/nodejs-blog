const express = require('express'),
  app = express(),
  { api } = require('./config'),
  port = api.port;


const loader = require('./loaders');
loader({ app })

app.listen(port, err => {
  if (err) {
    console.log(err)
    return process.exit(1)
  }
  console.log(`Server is running on ${port}, for api docs -> http://localhost:8081/api-docs`)
})

module.exports = app