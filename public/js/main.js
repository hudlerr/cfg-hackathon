/* generic XHR request */
function request(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(null, xhr.responseText);
        } else {
            cb('error' + xhr.responseType);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function updateDom(err, data) {
    if (err) {
        console.error(err);
    } else {
        var neighbourhood = JSON.parse(data);
        console.log("inside updateDom dashboard " + neighbourhood);
        var table = document.getElementById('maindiv');
        table.innerHTML = neighbourhood;
    }
}

request('/neighbourhood', updateDom);



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
