const userRequiredMessages = {
  email: 'Поле "email - электронная почта" является обязательным',
  password: 'Поле "password - пароль" является обязательным',
  name: 'Поле "name - имя пользователя" является обязательным',
};

const userValidateMessages = {
  email: 'не является email',
  password: 'внесённый пароль не является надёжным',
  nameMin: 'не соответсвует диапазону длины строки - от 2 до 30 символов',
};

const movieRequiredMessages = {
  country: 'Поле "country - страна" является обязательным',
  director: 'Поле "director - режиссёр" является обязательным',
  duration: 'Поле "duration - хронометраж" является обязательным',
  year: 'Поле "year - год" является обязательным',
  description: 'Поле "description - описание" является обязательным',
  nameRu: 'Поле "nameRU - название фильма на русском языке" является обязательным',
  nameEn: 'Поле "nameEN - название фильма на английском языке" является обязательным',
  image: 'Поле "image - ссылка на постер к фильму" является обязательным',
  trailerLink: 'Поле "trailer - ссылка на трейлер фильма" является обязательным',
  thumbnail: 'Поле"thumbnail - миниатюhf к фильму" является обязательным',
  owner: 'Поле"owner - _id пользователя" является обязательным',
  movieId: 'Поле "movieId - id фильма" является обязательным',
};
const movieValidateMessages = {
  image: 'не является URL адресом для постера к фильму',
  trailerLink: 'не является URL адресом для трейлера к фильму',
  thumbnail: 'не является URL адресом для миниатюры постера к фильму',
};

module.exports = {
  userRequiredMessages,
  userValidateMessages,
  movieRequiredMessages,
  movieValidateMessages,
};
