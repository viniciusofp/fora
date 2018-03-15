var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/fora';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/parte-um', function(req, res, next) {
  if (req.cookies.userid) {
    console.log('I have an ID already, thank you')
  } else {
    var userid = shortid.generate();
    console.log('Your userid has been set to: ' + userid)
    res.cookie('userid', userid)
  }

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
      res.render('parte1', { title: 'Express', data: result });
    });
  });
});
/* GET home page. */
router.get('/parte-dois', function(req, res, next) {
  if (req.cookies.userid) {
    console.log('I have an ID already, thank you')
  } else {
    var userid = shortid.generate();
    console.log('Your userid has been set to: ' + userid)
    res.cookie('userid', userid, {maxAge: 10800})
  }

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

router.post('/submit', function(req, res) {
    MongoClient.connect(url, function (err,database) {
        if (err) {
            console.log('Could not connect to DB')
        } else {
            const db = database.db('fora').collection('q');
            req.body.timestamp = new Date( Date.now() );
            req.body.userid = req.cookies.userid;
            db.find({userid: req.cookies.userid}).toArray(function(err, result) {
              if (result.length > 0) {
                db.findOneAndUpdate({userid: req.cookies.userid}, req.body)
                console.log('já preencheu, update')
              } else {
                db.insert(req.body)
              }
            })
        }
    })
    res.clearCookie("userid");
    res.redirect('/parte-dois')
})
router.post('/submitparte2', function(req, res) {
    MongoClient.connect(url, function (err,database) {
        if (err) {
            console.log('Could not connect to DB')
        } else {
            const db = database.db('fora').collection('q');
            req.body.userid = req.cookies.userid;
            db.find({userid: req.cookies.userid}).toArray(function(err, result) {
              if (result) {
                db.update({userid: req.cookies.userid}, {$set: req.body})
                console.log('já preencheu, update')
              } else {
                db.insert(req.body)
              }
            })
        }
    })
    res.clearCookie("userid");
    res.redirect('/')
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