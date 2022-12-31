const express = require('express');
const app = express();
const port = 4000;
app.use(express.json());
const controller = require('./controller/index');

app.use('/I/want/title/?address=google.com', controller);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use((req, res) => {
  res.status(404).send('Not Found');
});
