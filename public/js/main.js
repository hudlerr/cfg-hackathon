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
    request('/neighbourhood', showUserInfo);

    if (err) {
        console.error(err);
    } else {
        var tabledetails = JSON.parse(data);
        console.log('inside showTaskTable ' + data);
        var table = document.getElementById('tasks-table');
        var tasks = tabledetails.taskInfo;
        /* create a row in table for each task returned from DB */
        tasks.forEach(function(task) {
            var body = document.createElement('tbody');
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
            body.appendChild(row)
            table.appendChild(body);

            /* create listitem for each task found user has picked up */
            var outstandingdiv = document.getElementById('outstanding-tasks');
            var requesteddiv = document.getElementById('requested-tasks');
            if (task.repliedtouserid === tabledetails.loggedinUserId) {
                var listitem = document.createElement('LI');
                listitem.innerHTML = '<li style="font-size: 12px;">"' + task.titlecontent + '" for <mark>' + task.ownername + '</mark> - ' + task.ownernumber + ' - <mark>' + task.status + '</mark> </li>';
                outstandingdiv.append(listitem);

                /* create listitem for each task found user is owner of */
            } else if (task.ownerid === tabledetails.loggedinUserId) {
                var outlistitem = document.createElement('LI');
                if (task.repliedtousername === null) {
                    outlistitem.innerHTML = '<li style="font-size: 12px;">"' + task.titlecontent + '" <mark>is not picked up yet</mark> </li></br>';
                } else {
                    /* create button to complete a task if user is owner */
                    var statusbutton;
                    if (task.status === 'In Progress') {
                        statusbutton = '<button type="submit" class="btn btn-warning btn-sm" style="line-height: 0.9;">' + task.status + '</button>';
                    } else {
                        statusbutton = '<li><button type="submit" class="btn btn-success btn-sm" style="line-height: 0.9;" disabled>' + task.status + '</button></li>';
                    }
                    outlistitem.innerHTML = '<li style="font-size: 12px;">"' + task.titlecontent + '" picked up by <mark>' + task.ownername + '</mark> - ' + task.ownernumber + ' - <form name="completeRequest" action="/complete-request" method="post" style="display: inline;"> <input type="hidden" name="taskid" value="' + task.taskid + '"/> ' + statusbutton + '</form> </li></br>';
                }
                requesteddiv.append(outlistitem);
            }
        });
    }
}

request('/view-task', showTaskTable);