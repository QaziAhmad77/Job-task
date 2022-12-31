const fetch = require('node-fetch');
const express = require('express');
const controller = require('./controller/index');
const app = express();
const port = 4000;

app.get('/I/want/title/', controller);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use((req, res) => {
  res.status(404).send('Not Found');
});
