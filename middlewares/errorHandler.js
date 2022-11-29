const { INTERNAL_SERVER_ERROR_CODE } = require('../utils/errorCodes');

module.exports = ((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
