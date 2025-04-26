const ErrorMessage = {
  emptyFieldError: "Required",
  credentialLoginError: "Invalid credentials",
  passwordError: {
    minLength: "Should have at least 8 characters",
    missingLowerCase: "Your password must contain minimum 1 lower-case letter",
    missingUpperCase: "Your password must contain minimum 1 upper-case letter",
    missingNumber: "Your password must contain minimum 1 number",
    missingSpecialChar:
      "Your password must contain minimum 1 special character",
  },
  confirmPasswordError: "Passwords do not match",
  userNameError: {
    minLength: "Should be at least 5 characters",
    existedUser: "Already exists",
  },
  employeeNameError: "Invalid",
};

module.exports = { ErrorMessage };
