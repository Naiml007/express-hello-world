const express = require('express')
const cookieParser = require('cookie-parser');  
const path = require("path");
const app = express()

app.use(cookieParser());  
app.get('/cookieset',function(req, res){  
res.cookie('weblink', 'https://naimexpressapp.cyclic.app/');  
res.cookie('company', 'javatpoint');  
res.cookie('name', 'sonoo');  
  
res.status(200).send('Cookie is set');  
});  
app.get('/cookieget', function(req, res) {  
  res.status(200).send(req.cookies);  
});  

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
