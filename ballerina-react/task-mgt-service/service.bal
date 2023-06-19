import ballerina/http;
import ballerina/uuid;
// import ballerina/jwt;

type Task record {|
    string id?;
    string title;
    string description;
    string assignedUser;
|};

map<Task> tasks = {};
map<string> createdTasks = {};

# A service representing a network-accessible API
# bound to port `9090`.
service /manage on new http:Listener(9090) {

    resource function post tasks(http:Headers headers, Task task) returns Task|http:BadRequest|error {
        
        string|http:BadRequest username = check resolveUsernameFromHeaders(headers);
        if (username is http:BadRequest) {
            return username;
        }
        
        return createTask(username, task);
    }

    resource function get tasks(http:Headers headers) returns Task[]|http:BadRequest|error {
        
        string|http:BadRequest username = check resolveUsernameFromHeaders(headers);
        if (username is http:BadRequest) {
            return username;
        }

        return check getCreatedTasks(username);
    }

    resource function get tasks/[string id](http:Headers headers) returns Task|http:NotFound|http:BadRequest|error {
        
        string|http:BadRequest username = check resolveUsernameFromHeaders(headers);
        if (username is http:BadRequest) {
            return username;
        }

        Task? task = tasks[id];
        if (task == ()) {
            http:NotFound notFound = {
                body: {
                    "error": "Not Found",
                    "error_description": "Task not found with the given id  " + id
                }
            };
            return notFound;
        }
        if (createdTasks[id] != username) {
            http:NotFound notFound = {
                body: {
                    "error": "Not Found",
                    "error_description": "Task not found with the given id  " + id + " for the user " + username
                }
            };
            return notFound;
        }
        return <Task> task;
    }
}

service /me on new http:Listener(9091) {

    resource function get tasks(http:Headers headers) returns Task[]|http:BadRequest|error {
        
        string|http:BadRequest username = check resolveUsernameFromHeaders(headers);
        if (username is http:BadRequest) {
            return username;
        }

        return check getAssignedTasks(username);
    }

    resource function get tasks/[string id](http:Headers headers) returns Task|http:NotFound|http:BadRequest|error {
        
        string|http:BadRequest username = check resolveUsernameFromHeaders(headers);
        if (username is http:BadRequest) {
            return username;
        }

        Task? task = tasks[id];
        if (task == ()) {
            http:NotFound notFound = {
                body: {
                    "error": "Not Found",
                    "error_description": "Task not found with the given id  " + id
                }
            };
            return notFound;
        }
        if ((<Task> task).assignedUser != username) {
            http:NotFound notFound = {
                body: {
                    "error": "Not Found",
                    "error_description": "Task not found with the given id  " + id + " for the user " + username
                }
            };
            return notFound;
        }
        return <Task> task;
    }
}

function resolveUsernameFromHeaders(http:Headers headers) returns string|http:BadRequest|error {

    return "test@abc.com";
    
    // string|error jwtAssertion = headers.getHeader("x-jwt-assertion");
    // if (jwtAssertion is error) {
    //     http:BadRequest badRequest = {
    //         body: {
    //             "error": "Bad Request",
    //             "error_description": "Error while getting the JWT token"
    //         }
    //     };
    //     return badRequest;
    // }

    // [jwt:Header, jwt:Payload] [_, payload] = check jwt:decode(jwtAssertion);
    // string? username = payload.sub;
    // if (username == ()) {
    //     http:BadRequest badRequest = {
    //         body: {
    //             "error": "Bad Request",
    //             "error_description": "Error while getting the username from the JWT token"
    //         }
    //     };
    //     return badRequest;
    // }
    // return <string> username;
}

function getCreatedTasks(string username) returns  Task[]|error {
    
    Task[] createdTaskList = [];
    foreach var taskId in createdTasks.keys() {
        if (createdTasks[taskId] == username) {
            createdTaskList.push(<Task> tasks[taskId]);
        }
    }
    return createdTaskList;
}

function getAssignedTasks(string username) returns Task[]|error {

    Task[] assignedTaskList = [];
    foreach var taskId in tasks.keys() {
        if ((<Task> tasks[taskId]).assignedUser == username) {
            assignedTaskList.push(<Task> tasks[taskId]);
        }
    }
    return assignedTaskList;
}

function createTask(string createdUser, Task task) returns Task {

    string? taskId = task.id;
    if (taskId == ()) {
        taskId = uuid:createType1AsString();
        task.id = taskId;
    }
    tasks[<string> taskId] = task;
    createdTasks[<string> taskId] = createdUser;
    return <Task> tasks[<string> taskId];
}
