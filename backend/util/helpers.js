const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 72;

function validatePassword(password) {
  if (typeof password !== "string") {
    return { valid: false, error: "password must be a string" };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      error: `password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    };
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      valid: false,
      error: `password must be at most ${PASSWORD_MAX_LENGTH} characters`,
    };
  }
  return { valid: true };
}

module.exports = {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  validatePassword,
};
