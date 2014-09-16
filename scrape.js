var request = require('request');
var cheerio = require('cheerio');
var Sequelize = require('sequelize');
var express = require('express');
var app = express();
var coins;

// Construct sequelize
var sequelize = new Sequelize('periscrape', 'topher',  'Aa12345678',{
  dialect: 'postgres',
  port: 5432
});


// Define Schema
var Coin = sequelize.define('Coin', {
  name: Sequelize.STRING,
  price: Sequelize.STRING
}, {
  tableName: 'coins'
});

// Create Table
sequelize
  .sync({ force: true })
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err);
       process.exit(1);
     } else {
       console.log('Connected to database.');
     }
  });

// Connect to Database
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err);
      process.exit(1);
    }
      console.log('Connection to database has been established successfully.');
  });

// Scrape Website
request('http://coinmarketcap.com/', function (error, response, html) {
  if(error) { return 1; }
  if (response.statusCode != 200) {
    console.log("Reponse was not success.");
    process.exit(1);
  }
  var $ = cheerio.load(html);
  $('tr').each(function(i, element){
    var a = $(this);
    var name = a.find('td.currency-name').find('a').contents().text();
    var price = a.find('a.price').contents().text();
     Coin.create({
      name: name,
      price: price
    });
  });
});

// Routes

  // Index
  app.get('/', function (req, res) {
    sequelize
      .query('SELECT * FROM coins', null, { raw: true })
      .success(function(data) {
        res.json(data);
      });
  });

  // Raw prices
  app.get('/prices', function (req, res) {
    sequelize
      .query('SELECT price, name FROM coins', null, { raw: true })
      .success(function(data) {
        res.json(data);
      });
  });

  // Price by name
  app.get('/price/:name', function(req, res){
    sequelize
      .query('SELECT price FROM coins WHERE name = :name',
              null,
              { raw: true },
              {name: req.params.name}

      ).success(function(data) {
        res.json(data);
      });
  });

app.listen(3000);
console.log("Now listening to response on port 3000");