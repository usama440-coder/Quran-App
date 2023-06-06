// Required Feilds validator
const requiredFields = (...fields) => {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i]) {
      return false;
    }
  }

  return true;
};

// email validator
const checkEmail = (email) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return false;
  }

  return true;
};

// name validator
const checkName = (name) => {
  if (name.length < 5 || name.length > 50) {
    return false;
  }

  return true;
};

// password validator
const checkPassword = (password) => {
  if (password.length < 6 || password.length > 20) {
    return false;
  }

  return true;
};

module.exports = {
  checkEmail,
  checkName,
  checkPassword,
  requiredFields,
};
