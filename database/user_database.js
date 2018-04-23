let database;

const initCloudant = (callback) => {
    let cloudantURL = process.env.CLOUDANT_URL;
    let cloudant = require('cloudant')({
        url: process.env.CLOUDANT_URL,
        plugin: 'retry',
        retryAttempts: 10,
        retryTimeout: 500
    });

    cloudant.db.create(process.env.USER_DATABASE_NAME, (err, result) => {
        if (err)
            console.log('Database already exists.');
        else
            console.log('New database created.');
    })

    database = cloudant.db.use(process.env.USER_DATABASE_NAME);
    callback(null);
}

const getDatabase = (callback) => {
    if (database == undefined)  {
        initCloudant((error) => {
            callback(database);
        })
    }
}

module.exports= {
    getDatabase
}