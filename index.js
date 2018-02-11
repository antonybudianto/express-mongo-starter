const express = require('express');
const fetch = require('node-fetch');

const { connectDb } = require('./src/connect');

const app = express();
connectDb().then(db => startApp(db));

function startApp (db) {
  app.get('/hello', (req, res) => {
    insertDocuments(db, () => {
      res.send('OK')
    });
  });

  app.get('/query', (req, res) => {
    const docs = db.collection('documents');
    docs.find({}).toArray((err, arr) => {
      if (err) {
        return res.json({ err: err })
      }
      res.json({ data: arr })
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
