var acceptedUserName;
var acceptedPhonenumber;

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
            var value;
            if (task.repliedtouserid === null) {
                //Create form with button - 'i can help'
                value = 'I can help!';
                var button = ' <form name="buttonForm" action="/accept-request" method="post"> <input type="hidden" name="taskid" value="' + task.taskid + '"/> <button type="submit" class="btn" onclick="">' + value + '</button></form>';
                status.innerHTML = button;
            } else {
                //display user name and number - depending on who is logged in :( 
                //TODO: fit complete button into here?
                status.innerHTML = 'Picked up by ' + task.repliedtousername;
            }
            row.appendChild(status);

            table.appendChild(row);
        });
    }
    // request('/getacceptedUserDetails', editTaskTable)
    request('/neighbourhood', showUserInfo);
}

function editTaskTable(err, data) {
    if (err) {
        console.error(err);
    } else {
        var acceptedUserDetails = JSON.parse(data);
        console.log("inside editTaskTable " + acceptedUserDetails);

        acceptedUserName = acceptedUserDetails.name;
        acceptedPhonenumber = acceptedUserDetails.phonenumber;
    }
}

request('/view-task', showTaskTable);