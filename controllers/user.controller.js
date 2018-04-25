const db = require('../database/user_database');

let database;

db.getDatabase(result => {
    database = result;
});

const getUser = (data, callback) => {
    if (data.email != null) {
        database.find({
            selector: {
                "email": data.email
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

const authUser = (data, callback) => {
    if (data.email != null && data.password != null) {
        database.find({
            selector: {
                "email": data.email,
                "password": data.password
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

const insertUser = (data, callback) => {
    if (data.name != null && data.email != null) {
        getUser(data, (err, result) => {
            if (err) callback(err, null);
            else {
                if (result != null) 
                    callback(null, result);
                else {
                    database.insert(data, (err, result2) => {
                        if (err) callback({
                            status_code: 500,
                            msg: "INTERNAL_SERVER_ERROR"
                        }, null);
                        else {
                            data._id = result2.id;
                            callback(null, data);
                        }
                    });
                }
            }
        });
    } else
        callback({
            status_code: 400,
            msg: "BAD_REQUEST"
        }, null);
}

module.exports = {
    getUser,
    authUser,
    insertUser
}