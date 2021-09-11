/* eslint-disable prefer-const */
const createError = require('http-errors');
const axios = require('axios');

const authMiddleware = (req, res, next) => {
  if ('authorization' in req.headers) {
    let { API_URL } = process.env;
    axios({
      method: 'post',
      url: `${API_URL}/token`,
      data: {},
      headers: req.headers,
    })
      // eslint-disable-next-line no-shadow
      .then((response) => {
        console.log(response.data);
        if (response.data === 'OK') {
          next();
        } else {
          res.status(401).send(createError.Unauthorized());
        }
      })
      .catch((error) => {
        res.status(401).send(createError.Unauthorized());
      });
  } else {
    res.status(401).send(createError.Unauthorized());
  }
};

module.exports = authMiddleware;
