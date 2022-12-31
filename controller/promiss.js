const fetch = require('node-fetch');

module.exports = (req, res) => {
  let { address } = req.query;

  const parseTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
    if (!match || typeof match[1] !== 'string') {
      return Promise.reject(new Error('Unable to parse the title tag'));
    }
    return Promise.resolve(match[1]);
  };

  if (!address) {
    return res.status(400).end('Missing address query parameter');
  }

  fetch(address)
    .then((response) => response.text())
    .then((body) => parseTitle(body))
    .then((title) => {
      if (!title) {
        return Promise.reject(new Error('Unable to parse title'));
      }
      res.status(200).send(title);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${address} - NO RESPONSE  "Only absolute URLs are supported"` || err.message);
    });
};
