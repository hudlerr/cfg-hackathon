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

function showUserInfo(err, data) {
    if (err) {
        console.error(err);
    } else {
        var userInfo = JSON.parse(data);
        console.log("inside updateDom dashboard " + data);
        var neighbourhood = document.getElementById('maindiv');
        neighbourhood.innerHTML = "My NeighbourHood " + userInfo.wardname + ' - ' + userInfo.admindistrict;
        var namediv = document.getElementById('hi-user');
        namediv.innerHTML = 'Hello, ' + userInfo.user.fullname;
    }
}

function showTaskTable(err, data) {
    if (err) {
        console.error(err);
    } else {
        var tasks = JSON.parse(data);
        console.log('inside showTaskTable ' + data);
        console.log('just to chck ' + tasks.descriptioncontent);
        var table = document.getElementById('tasks-table');
        /* create a row in table for each task returned from DB */
        tasks.forEach(function(task) {
            var row = document.createElement('tr');

            //create date column
            var date = document.createElement('td');
            date.innerHTML = task.created_date;
            row.appendChild(date);

            //create task title column
            var title = document.createElement('td');
            title.innerHTML = task.titlecontent;
            row.appendChild(title);

            //create task desciption column
            var description = document.createElement('td');
            description.innerHTML = task.descriptioncontent;
            row.appendChild(description);

            //create status column
            var status = document.createElement('td');
            if (task.repliedtouserid === null) { //TODO: create button for 'i can help'
                status.innerHTML = 'I can help!';
            } else {
                status.innerHTML = task.repliedtouserid; //TODO: fit complete button into here?
            }
            row.appendChild(status);

            table.appendChild(row);
        });
    }
    request('/neighbourhood', showUserInfo);
}

request('/view-task', showTaskTable);