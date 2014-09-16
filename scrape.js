var request = require('request');
var cheerio = require('cheerio');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('periscrape', 'topher',  'Aa12345678',{
  dialect: 'postgres',
  port: 5432
});

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })


var $;
request('https://news.ycombinator.com', function (error, response, html) {
  if(error) { return 1; }
  if (response.statusCode != 200) { return 1; }
  $ = cheerio.load(html);
  $('span.comhead').each(function(i, element){
    var a = $(this).prev();
    console.log(a.attr('href'));
  });
});

