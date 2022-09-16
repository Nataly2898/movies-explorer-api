const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/config');
const { errorMessages } = require('../utils/constants');
const NotAuthorizationError = require('../errors/NotAuthorizationError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizationError(errorMessages.notAuthorizationErrorJWT);
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new NotAuthorizationError(errorMessages.notAuthorizationErrorJWT);
  }

  req.user = payload;

  next();
};
