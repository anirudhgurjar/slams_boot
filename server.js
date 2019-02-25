const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 8083;
app.get(/.*/,function(req,res){
    res.sendfile(__dirname + "/dist/index.html");
});

app.listen(port);