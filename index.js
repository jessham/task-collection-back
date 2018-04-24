const dotenv = require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(body_parser.json());
app.use(cors());

const user_controller = require('./controllers/user.controller');
const task_controller = require('./controllers/task.controller');

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/addUser', (req, res) => {
    const data = req.body;
    user_controller.insertUser(data, (err, result) => {
        if (err)
            res.status(err.status_code).json(err);
        else
            res.status(200).json(result);
    });
});

app.get('/getTasks', (req, res) => {
    const data = req.query;
    task_controller.getTasks(data, (err, result) => {
        if (err)
            res.status(err.status_code).json(err);
        else
            res.status(200).json(result);
    });
});

app.post('/addTask', (req, res) => {
    const data = req.body; 
    task_controller.insertTask(data, (err, result) => {
        if (err)
            res.status(err.status_code).json(err);
        else
            res.status(200).json(result);
    });
});

app.post('/deleteTask', (req, res) => {
    const data = req.body;
    task_controller.deleteTask(data, (err, result) => {
        if (err)
            res.status(err.status_code).json(err);
        else
            res.status(200).json(result);
    });
});

app.post('/updateTask', (req, res) => {
    const data = req.body;
    task_controller.updateTask(data, (err, result) => {
        if (err)
            res.status(err.status_code).json(err);
        else
            res.status(200).json(result);
    });
});

app.listen(app.get('port'), () => {
    console.log(`App is listening on port ${ app.get('port') }`);
});