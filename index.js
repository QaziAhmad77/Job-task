const express = require('express');
const app = express();
const port = 4000;

// const controller = require('./controller/asyncAwait'); // By async and await method check this one and commit the remaining 2
// const controller = require('./controller/promiss'); // By prommise (resolve, reject) method check this one and commit the remaining 2
const controller = require('./controller/thenCatch'); // By then and Catch method check this one and commit the remaining 2

const handlebars = require('handlebars');
const hbs = handlebars.create();
const path = require('path');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/I/want/title/', controller);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use((req, res) => {
  res.status(404).send('404 error Page Not Found');
});
