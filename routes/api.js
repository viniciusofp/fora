var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/fora';


router.get('/', function(req, res) {
    MongoClient.connect(url, function (err,database) {
        if (err) {
            console.log('Could not connect to DB')
        } else {
            const db = database.db('fora')
            var q = db.collection('q');
            q.find({}).toArray(function(err, result) {
                res.json(result)
            })
        }
    })
})
router.get('/completos/', function(req, res) {
    MongoClient.connect(url, function (err,database) {
        if (err) {
            console.log('Could not connect to DB')
        } else {
            const db = database.db('fora')
            var q = db.collection('q');
            q.find({ name: { $exists: true } }).toArray(function(err, result) {
                res.json(result)
            })
        }
    })
})

module.exports = router;
