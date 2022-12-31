const fetch = require('node-fetch');
module.exports = (req, res) => {
  const parseTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
    if (!match || typeof match[1] !== 'string') throw new Error('Unable to parse the title tag');
    return match[1];
  };

  const { address } = req.query;
  if (!address) {
    return res.status(400).send('Missing address query parameter');
  }

  fetch(address)
    .then((res) => res.text()) // parse response's body as text
    .then((body) => parseTitle(body)) // extract <title> from body
    .then((title) => res.send(title)) // send the result back
    .catch((e) =>
      res.status(500).send(
        ` ${address} - NO RESPONSE  "
    Only absolute URLs are supported"` || e.message
      )
    ); // catch possible errors
};
