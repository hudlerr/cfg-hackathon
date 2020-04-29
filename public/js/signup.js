(function () {
  document.forms.register.noValidate = true;
  $('form').on('submit', function(e) {
    var elements = this.elements;
    var valid = {};
    var isValid;
    var idFormValid;

    //Generic Checks
    for (var i = 0, l = (elements.length - 1); i < l; i++) {
      isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
      if (!isValid) {
        showErrorMessages(elements[i]);
      } else {
        removeErrorMessage(elements[i]);
      }
      valid[elements[i].id] = isValid;
    }

    //Custom Valdation
    if (!validatePhone()) {
      showErrorMessages(document.getElementById('phone'));
      valid.password = false;
    } else {
      removeErrorMessage(document.getElementById('phone'));
    }

    if (!validatePassword()) {
      showErrorMessages(document.getElementById('password'));
      valid.password = false;
    } else {
      removeErrorMessage(document.getElementById('password'));
    }
//Add more if needed

    //Did it pass/ can it submit the form
    for (var field in valid) {
      if (!valid[field]) {
        isFormValid = false;
        break;
      }
      isFormValid = true;
    }

    //Prevent submition
    if (!isFormValid) {
      e.preventDefault();
    }
  });


  //functions here

function validateRequired(el) {
  if (isRequired(el)){
    var valid = !isEmpty(el);
    if (!valid) {
      setErrorMessage(el, 'Field is required');
    }
    return valid;
  }
  return true;
}

function isRequired(el) {
  return ((typeof el.required === 'boolean') && el.required) ||
    (typeof el.required === 'string');
}

function isEmpty(el) {
  return !el.value || el.value === el.placeholder;
}

function setErrorMessage(el, message) {
  $(el).data('errorMessage', message);
}

function showErrorMessages(el) {
  var $el = $(el);
  var $errorContainer = $el.siblings('.error');

  if (!$errorContainer.length) {
    $errorContainer = $('<span class="error"></span>').insertAfter($el);
  }
    $errorContainer.text($(el).data('errorMessage'));
 }

 function validateTypes(el) {
   if (!el.value) return true;

   var type = $(el).data('type') || el.getAttribute('type');
   if (typeof validateType[type] === 'function') {
     return validateType[type](el);
   } else {
     return true;
   }
 }

 var validateType = {
   email: function(el) {
     var valid = /[^@]+@[^@]+/.test(el.value);
     if (!valid) {
       setErrorMessage(el, 'Please enter a valid email');
     }
     return valid;
   },
 }

 function validatePassword() {
   var password = document.getElementById('password');
   var valid    = password.value.length >= 8;
   if (!valid) {
     setErrorMessage(password, 'Password must be at least 8 characters');
   }
   return valid;
 }
}());