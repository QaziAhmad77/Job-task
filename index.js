const fetch = require('node-fetch');
const express = require('express');
<<<<<<< Updated upstream
const controller = require('./controller/tryCatch');
=======

const controller = require('./controller/thenCatch'); // By then and Catch method check this one
// const controller = require("./controller/tryCatch") // By async and await method check this one

>>>>>>> Stashed changes
const app = express();
const port = 4000;

app.get('/I/want/title/', controller);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use((req, res) => {
  res.status(404).send('404 error Page Not Found');
});
