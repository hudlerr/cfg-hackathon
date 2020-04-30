/* validation for user post form  */
function validateForm() {
  var errormessage = "";

   if (document.getElementById('task').value == "") {
     errormessage += "Please enter a task.\n";
   }

   if (document.getElementById('description').value == "") {
     errormessage += "Please enter a description of your task.\n";
   }

   if (errormessage != "") {
     alert(errormessage);
     return false;
   }
}
