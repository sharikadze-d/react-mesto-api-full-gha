const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const getJwtToken = (id) => jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: '7d' });

const verify = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  getJwtToken,
  verify,
};
