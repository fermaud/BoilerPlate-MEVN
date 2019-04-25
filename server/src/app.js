const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
const db = mongodb_conn_module.connect();

const User = require("../models/user");

app.get('/users', (req, res) => {
    User.find({}, 'name surname mail admin', function (error, users) {
        if (error) { console.error(error); }
        res.send({
            users: users
        })
    }).sort({_id:-1})
})

app.post('/add_user', (req, res) => {
    const db = req.db;
    const admin = req.body.admin;
    const name = req.body.name;
    const surname = req.body.surname;
    const mail = req.body.mail;
    const new_user = new User({
        name: name,
        surname: surname,
        mail: mail,
        admin: admin
    });

    new_user.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})

app.put('/users/:id', (req, res) => {
    const db = req.db;
    User.findById(req.params.id, 'name surname mail admin', function (error, user) {
        if (error) { console.error(error); }
        user.admin = req.body.admin;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.mail = req.body.mail;
        user.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            });
        })
    })
})

app.delete('/users/:id', (req, res) => {
    const db = req.db;
    User.remove({
        _id: req.params.id
    }, function(err, user){
        if (err)
            res.send(err)
        res.send({
            success: true
        })
    })
})

app.get('/user/:id', (req, res) => {
    const db = req.db;
    User.findById(req.params.id, 'name surname mail admin', function (error, user) {
        if (error) { console.error(error); }
        res.send(user)
    })
})

app.listen(process.env.PORT || 8081)
