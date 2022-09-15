const jwt = require('jsonwebtoken');
const NotAuthorizationError = require('../errors/NotAuthorizationError');
<<<<<<< HEAD
const { errorMessages } = require('../utils/constants');
const { JWT_KEY } = require('../utils/config');
=======

const { NODE_ENV, JWT_SECRET } = process.env;
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
<<<<<<< HEAD
    throw new NotAuthorizationError(errorMessages.validationErrorMessage);
=======
    throw new NotAuthorizationError('Необходима авторизация.');
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // попытаемся верифицировать токен
<<<<<<< HEAD
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new NotAuthorizationError(errorMessages.validationErrorMessage);
=======
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'
    );
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new NotAuthorizationError('Необходима авторизация.');
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
  }

  req.user = payload;

  next();
};
