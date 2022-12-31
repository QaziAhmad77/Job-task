const fetch = require('node-fetch');
const express = require('express');

// const controller = require('./controller/tryCatch'); // By async and await method check this one and commit the remaining
// const controller = require('./controller/thenCatch'); // By then and Catch method check this one and commit the remaining
const controller = require('./controller/promiss'); // By prommise (resolve, reject) method check this one and commit the remaining

const app = express();
const port = 4000;

app.get('/I/want/title/', controller);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use((req, res) => {
  res.status(404).send('404 error Page Not Found');
});
