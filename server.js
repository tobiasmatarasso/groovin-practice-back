const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    { MongoClient } = require('mongodb'),
    { url, dbName } = require('./config/db');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Connect to MongoDB
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  require('./app/routes')(app, db);
  
});

// Routes

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});