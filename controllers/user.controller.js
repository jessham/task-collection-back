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

const insertUser = (data, callback) => {
    getUser(data, (err, result) => {
        if (err) callback(err, null);
        else {
            if (result != null)
                callback({
                    status_code: 409,
                    msg: 'USER_ALREADY_EXISTS'
                }, null);
            else {
                if (data.nome != null && data.password != null && data.email != null) {
                    database.insert(data, (err, result) => {
                        if (err) callback({
                            status_code: 500,
                            msg: "INTERNAL_SERVER_ERROR"
                        }, null);
                        else callback(null, data);
                    });
                } else
                    callback({
                        status_code: 400,
                        msg: "BAD_REQUEST"
                    }, null);
            }
        }
    });
}

module.exports = {
    getUser,
    insertUser
}