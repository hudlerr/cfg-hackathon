/*Listen to submit button
const form = document.querySelector('.postcode-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const postcodeInput = document.querySelector('.postcode-input').value;
    //const searchWord = input.trim();
    console.log(postcodeInput);
    getUserNeighbourhood(postcodeInput);
}

/* Generic request function can be used repeatedly
const request = (url, cb) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(null, xhr.responseText);
            } else {
                // if the API returns an error, pass the error into the callback as the first argument
                var errorMessage = xhr.responseText;
                cb("Error " + url + " " + errorMessage);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

const getUserNeighbourhood = postcode => {
    console.log("inside getUserNeighbourhood")
    var postcodeAPIURL = "https://api.postcodes.io/postcodes/" + postcode;
    console.log(postcodeAPIURL);
    request(postcodeAPIURL, function(error, response) {
        if (error) {
            console.log("Oops" + error);
            return;
        }
        renderSubmit(response);
    });
}*/

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

function renderSubmit(err, data) {
    if (err) {
        console.error(err);
    } else {
        var ward = JSON.parse(data);
        console.log(ward);
        document.getElementById('maindiv').innerHTML = '<h3> My Neighbourhood - ' + ward + '</h3';
    }
}

request('/my-dashboard', renderSubmit);