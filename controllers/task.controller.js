const db = require('../database/task_database');

let database;

db.getDatabase((result) => {
    database = result;
});

const getTasks = (data, callback) => {
    if (data.user_id != null) {
        database.find({
            selector: {
                "user_id": data.user_id
            },
            fields: [],
        }, function (err, result) {
            if (err)
                callback({
                    status_code: 500,
                    msg: 'INTERNAL_SERVER_ERROR',
                }, null);
            else {
                var sortedResult = result.docs;
                sortedResult.sort(function (a, b) {
                    return a.creation_date - b.creation_date;
                })
                result.docs = sortedResult;
                callback(null, result);
            }
        });
    } else
        callback({
            status_code: 400,
            msg: "BAD_REQUEST"
        }, null);
}

const getTask = (data, callback) => {
    if (data._id != null) {
        database.find({
            selector: {
                "_id": data._id
            },
            fields: []
        }, function (err, result) {
            if (err)
                callback({
                    status_code: 500,
                    msg: 'INTERNAL_SERVER_ERROR'
                }, null);
            else callback(null, result.docs[0]);
        });
    } else
        callback({
            status_code: 400,
            msg: "BAD_REQUEST"
        }, null);
}

const insertTask = (data, callback) => {
    if (data.text != null) {
        database.insert(data, (err, result) => {
            if (err)
                callback({
                    status_code: 500,
                    msg: "INTERNAL_SERVER_ERROR"
                }, null);
            else {
                data._id = result.id;
                data._rev = result.rev;
                callback(null, data);
            }
        });
    } else {
        callback({
            status_code: 400,
            msg: "BAD_REQUEST"
        }, null);
    }
}

const deleteTask = (data, callback) => {
    getTask(data, (err, result) => {
        if (err) callback(err, null); 
        else {
            if (result != null) {
                database.destroy(result._id, result._rev, (err, result) => {
                    if (err)
                        callback({
                            status_code: 500,
                            msg: "INTERNAL_SERVER_ERROR"
                        },null);
                    else
                        callback(null, result);
                });
            }
            else {
                callback({
                    status_code: 409,
                    msg: "TASK_DOES_NOT_EXISTS"
                }, null);
            }
        }
    });
}

const updateTask = (data, callback) => {
    database.insert(data, (err, result) => {
        if (err) {
            callback({
                status_code: 500,
                msg: 'INTERNAL_SERVER_ERROR'
            }, null);
        } else {
            data._rev = result.rev;
            callback(null, data);
        }
    });
}

module.exports = {
    getTasks,
    getTask,
    insertTask,
    deleteTask,
    updateTask
}