// server.js
// where your node app starts

// init project
const express = require('express');
const fetch = require('node-fetch')
const app = express();
const {sleep} = require('./util');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use('/s',express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', async function(req, res) {
  _send_heading(req,res)
  var head_loaded = false
  res.write('<style>img{display:none;}body{background-image:none!important;}</style><script>setInterval(function(){window.scrollTo(0,document.body.scrollHeight);},1000)</script>')
  let y = await (await fetch('https://www.yyyyyyy.info/')).text()
  let yy = y.match(/.{1,10}/g);
  for(x of yy) {
    if(!head_loaded && (x.includes('</head') || x.includes('<img') || x.includes('<body'))){head_loaded=true}
    res.write(x);
    if(head_loaded){await sleep(Math.floor(Math.random()*400))}
  }
});

function _send_heading(req,res) { 
  res.writeHead(200, { 
    "Content-Type": "text/html; charset=utf8",
    "Cache-control": "no-cache", 
    "Connection": "keep-alive", 
    "transfer-encoding": "chunked"
  });
  //res.write('<!doctype html><html><head><title>streamy</title><link rel="stylesheet" type="text/css" href="/s/style.css"></head><body>')
}

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
