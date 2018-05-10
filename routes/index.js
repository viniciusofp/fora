var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/fora';


/* GET home page. */
router.get('/', function(req, res, next) {

  // Set user ID if it doesn't exist
  if (req.cookies.userid) {
    console.log('I have an ID already, thank you')
  } else {
    var userid = shortid.generate();
    console.log('Your userid has been set to: ' + userid)
    res.cookie('userid', userid)
  }

  // Connect to database and insert (or update) form
  MongoClient.connect(url, function(err, database) {
    if (err) {
      throw err;
    }
    var data = [];
    const db = database.db('fora').collection('q');
    req.body.timestampBegin = new Date( Date.now() );
    req.body.userid = userid;
    var ip = req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;
    console.log(ip)

    db.find({userid: userid}).toArray(function(err, result) {
      if (result.length > 0) {
        db.findOneAndUpdate({userid: userid}, req.body)
        console.log('já preencheu, update')
      } else {
        db.insert(req.body)
      }
    })

      res.render('parte1', { title: 'Fora - Questionário' });
  });
});

/* TELA FINAL */
router.get('/fim', function(req, res, next) {
  MongoClient.connect(url, function(err, database) {
    if (err) {
      throw err;
    }
    var data = [];
    const db = database.db('fora').collection('q');


    db.find().toArray(function(err, result) {
      if (err) {
        throw err;
      }
      res.render('parte2', { title: 'Parte2', data: result });
    });
  });
});

// POST FORM
router.post('/submit', function(req, res) {
    MongoClient.connect(url, function (err,database) {
        if (err) {
            console.log('Could not connect to DB')
        } else {
            const db = database.db('fora').collection('q');
            req.body.timestampEnd = new Date( Date.now() );
            req.body.userid = req.cookies.userid;
            db.find({userid: req.cookies.userid}).toArray(function(err, result) {
              if (result.length > 0) {
                console.log(result);
                req.body.timestampBegin = result[0].timestampBegin;
                db.findOneAndUpdate({userid: req.cookies.userid}, req.body)
                console.log('já preencheu, update')
              } else {
                db.insert(req.body)
              }
            })
        }
      res.redirect('/fim')
    })


})
router.post('/emailform', function(req, res) {
    MongoClient.connect(url, function (err,database) {
        if (err) {
            console.log('Could not connect to DB')
        } else {
            const db = database.db('fora').collection('q');
            db.find({userid: req.cookies.userid}).toArray(function(err, result) {
              if (result.length > 0) {
                console.log(result);
                result[0].email = req.body.email;                db.findOneAndUpdate({userid: req.cookies.userid}, result[0])
                console.log('já preencheu, update')
              }
            })
        }
      res.clearCookie("userid");
      res.redirect('/')
    })


})


// router.get('/cleardb', function(req, res, next) {
//   MongoClient.connect(url, function(err, database) {
//   if (err) {
//     throw err;
//   }
//   const db = database.db('fora')
//   var q = db.collection('q');
//   q.remove();

// });
//   res.redirect('/')
// });

module.exports = router;