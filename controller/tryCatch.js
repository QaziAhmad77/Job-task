const fetch = require('node-fetch');
module.exports = async (req, res) => {
  let { address } = req.query;
  try {
    const parseTitle = (body) => {
      let match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
      if (!match || typeof match[1] !== 'string') throw new Error('Unable to parse the title tag');
      return match[1];
    };

    if (!address) {
      return res.status(400).end('Missing address query parameter');
    }

    const response = await fetch(address);
    const body = await response.text();
    const title = parseTitle(body);
    if (!title) {
      return res.status(400).send('Unable to parse title');
    }
    return res.status(200).send(title);
  } catch (err) {
    console.log(err);
    return res.status(500).send(` ${address} - NO RESPONSE  -  Only absolute URLs are supported` || err.message);
  }
};
