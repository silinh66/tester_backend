const success = (mes = null, payload = []) => {
  return {
    message: mes ? mes : "Thành công",
    error: false,
    payload,
  };
};

const error = (mes = null, payload = []) => {
  return {
    message: mes ? mes : "Thất bạiiii",
    error: true,
    payload,
  };
};

const errorToken = (mes = null) => {
  return {
    message: mes ? mes : "Access Denied",
    token_invalid: true,
    payload: null,
    error: true,
  };
};

module.exports = {
  success,
  error,
  errorToken,
};
