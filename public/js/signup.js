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
      } else
    }
  })
})