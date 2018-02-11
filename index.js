const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const { connectDb } = require('./src/connect');

const app = express();
connectDb().then(db => startApp(db));

function startApp (db) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/documents', (req, res) => {
    const docs = db.collection('documents');
    const data = {
      text: req.body.text
    };
    docs.insert(data, (err, result) => {
      if (err) {
        return res.status(400).json({
          error: 'Please check request body.'
        });
      }
      res.status(201).json({
        data: result.ops[0]
      });
    });
  });

  app.get('/documents', (req, res) => {
    const docs = db.collection('documents');
    docs.find({}).toArray((err, arr) => {
      if (err) {
        return res.status(400)
          .json({ err: 'Please check your query again' });
      }
      res.json({ data: arr });
    });
  });

  console.log('API live at http://localhost:3000/hello');
  app.listen(3000);
}

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
