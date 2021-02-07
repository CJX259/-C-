const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const PORT = 85;
const staticPath = path.resolve(__dirname, './dist');
const app = new express();
app.use(history());

app.use(express.static(staticPath));

app.listen(PORT, function(err) {
  console.log('监听'+PORT+'端口');
  if(err){
    console.log(err);
  }
})