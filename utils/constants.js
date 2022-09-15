const errorMessages = {
  validationErrorMessage: 'Переданы некорректные данные',
  notFoundUserError: 'Пользователь по указанному _id не найден',
  emailExistingEmailError: 'Пользователь с таким e-mail уже существует',
  forbiddenErrorMessage: 'В доступе отказано',
  notFoundErrorDB: 'Данные не найдены!',
  movieNotFoundError: 'Фильм с указанным _id не найден',
  notAuthorizationErrorJWT: 'Необходима авторизация',
  incorrectRequestError: 'Некорректный адрес URL',
  notAuthorizationError: 'Неправильный e-mail или пароль',
  validationEmailError: 'Некорректый адрес почты',
  notFoundSiteError: 'Запрашиваемая страница не существует',
  serverError: 'На сервере произошла ошибка',
  serverDeadError: 'Сервер сейчас упадёт',
};

module.exports = { errorMessages };
