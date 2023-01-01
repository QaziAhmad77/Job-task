const fetch = require('node-fetch');
module.exports = async (req, res) => {
  let addresses = req.query.address;
  // Below condition checks for array and convert single address to array
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }
  try {
    // parseTitle returns a promise that either resolves with the title if it was able to be parsed, or rejects with an error if it was not.
    const parseTitle = (body) => {
      let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
      if (!match || typeof match[1] !== 'string') {
        return res.send('Unable to parse the title tag');
      }
      return match[1];
    };
    // processAddress function takes an input of a URL address. It tries to fetch the webpage located at that URL, and then it attempts to parse the title of the webpage from the HTML body of the webpage. If it is able to parse the title, it returns it, otherwise it returns an error message indicating that it was unable to parse the title
    const processAddress = async (address) => {
      try {
        // checking either addresses exist or not
        if (!address) {
          return res.status(400).send('Missing address query parameter');
        }
        const response = await fetch(address);
        const body = await response.text();
        const title = parseTitle(body);
        if (!title) {
          return res.status(400).send('Unable to parse title');
        }
        return title;
      } catch (err) {
        console.log(err);
        res.status(500).send(`${address} - NO RESPONSE  -  Only absolute URLs are supported` || err.message);
      }
    };

    const result = {};
    for (const a of addresses) {
      const title = await processAddress(a);
      result[a] = title;
    }
    res.render('html', { result });
  } catch (err) {
    console.log(err);
    return res.status(500).send(` ${addresses} - NO RESPONSE  -  Only absolute URLs are supported` || err.message);
  }
};
