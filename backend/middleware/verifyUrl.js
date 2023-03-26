const url = require('url');

// middleware that checks to make sure it is an indeed url

const verifyUrl = (req, res, next) => {
  try {
    const encodedUrl = req.params.encodedUrl;
    const url = decodeURIComponent(encodedUrl);
    const baseUrl = new URL(url).origin;

    if (baseUrl.includes('indeed.com')) {
      next();
    } else {
      throw new Error(`Not an indeed listing, cannot be parsed!`);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyUrl };
