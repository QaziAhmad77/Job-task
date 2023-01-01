const fetch = require('node-fetch');
module.exports = (req, res) => {
  // parseTitle returns a promise that either resolves with the title if it was able to be parsed, or rejects with an error if it was not.
  const parseTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
    if (!match || typeof match[1] !== 'string') {
      res.send('Unable to parse the title tag');
    }
    return match[1];
  };
  let addresses = req.query.address;
  // Below condition checks for array and convert single address to array
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }
  // checking either addresses exist or not
  if (!addresses.length) {
    return res.status(400).send('Missing address query parameter');
  }
  // create an object to store the titles
  const result = {};
  // create a counter variable to keep track of the number of responses received
  let count = 0;
  // use a loop to fetch the data for each address and extract the title
  for (const address of addresses) {
    fetch(address)
      .then((res) => res.text()) // parse response's body as text
      .then((body) => parseTitle(body)) // extract <title> from body
      .then((title) => {
        // add the title to the object using the address as the key
        result[address] = title;
        count++;
        // check if all responses have been received
        if (count === addresses.length) {
          // send the object of titles back to the client
          res.render('html', { result });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`${address} - NO RESPONSE  -  Only absolute URLs are supported` || err.message);
      });
  }
};
