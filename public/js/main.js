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
        console.log("inside updateDom dashboard " + neighbourhood.wardname + neighbourhood.admindistrict);
        var table = document.getElementById('maindiv');
        table.innerHTML = "My NeighbourHood " + neighbourhood.wardname + ' - ' + neighbourhood.admindistrict;
    }
}

request('/neighbourhood', updateDom);
