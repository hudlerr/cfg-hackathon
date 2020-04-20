var form = document.getElementsByTagName("form")[0];
var email = document.getElementById("email");
var email = document.getElementById("phone");
var email = document.getElementById("postcode");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm_password");
var error = document.querySelector(".error");

form.addEventListener("Submit", function(event) {
  if (password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.innerText = "Please enter a password";
    event.preventDefault();
  }

  if (password.validity.patternMismatch ||
    confirmPassword.validity.patternMismatch
  ) {
    error.innerText =
      "Password must contain at least eight characters, including one letter and one number";
    event.preventDefault();
  }

  if (password.value != confirmPassword.value) {
    error.innerText = "Passwords do not match";
    event.preventDefault();
  }

  if (email.validity.typeMismatch) {
    error.innerText = "Please enter a valid email address";
    event.preventDefault();
  }

  if (email.validity.valueMissing) {
    error.innerText = "Please enter an email address";
    event.preventDefault();
  }

  if (phone.validity.valueMissing) {
    error.innerText = "Please enter a Phone Number";
    event.preventDefault();
  }

  if (postcode.validity.valueMissing) {
    error.innerText = "Please enter your Postcode";
    event.preventDefault();
  }

});
