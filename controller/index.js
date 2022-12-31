module.exports = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).send(err.message || 'Something went wrong');
  }
};
