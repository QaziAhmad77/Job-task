const fetch = require('node-fetch');

module.exports = (req, res) => {
  let addresses = req.query.address;
  // This convert single address to array because I'm using map in below code to parse these links
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }
  // parseTitle returns a promise that either resolves with the title if it was able to be parsed, or rejects with an error if it was not.
  const parseTitle = (body) => {
    return new Promise((resolve, reject) => {
      let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
      if (!match || typeof match[1] !== 'string') {
        reject(new Error('Unable to parse the title tag'));
      }
      resolve(match[1]);
    });
  };
  // checking either addresses exist or not
  if (!addresses.length) {
    return res.status(400).end('Missing address query parameter');
  }

  // create an array of Promises for each address
  const requests = addresses.map((address) => {
    return fetch(address)
      .then((response) => response.text())
      .then((body) => parseTitle(body))
      .then((title) => {
        if (!title) {
          return Promise.reject(res.send('Unable to parse title'));
        }
        return { title, address };
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`${address} - NO RESPONSE  -  Only absolute URLs are supported` || err.message);
      });
  });

  // Promise.all wait for all requests to complete
  Promise.all(requests)
    .then((titles) => {
      if (titles.length === 1) {
        // render "single address"
        let result = titles[0];
        console.log(result);
        res.render('html', { result });
      } else if (titles.length >= 2) {
        // render "multiple addresses"
        const result = {};
        // Below forEach loop insert elements of array in result object in order to render (we can also send an array but dealing with objects is easy and I already used objects in hbs file)
        titles.forEach((element) => {
          result[element.title] = element.address;
        });
        res.render('html', { result });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`${addresses} - NO RESPONSE  -  Only absolute URLs are supported` || err.message);
    });
};
