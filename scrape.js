var request = require('request');
var cheerio = require('cheerio');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('periscrape', 'topher',  'Aa12345678',{
  dialect: 'postgres',
  port: 5432
});


var Article = sequelize.define('Article', {
  title: Sequelize.STRING,
  link: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  tableName: 'articles'
});


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

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err);
      process.exit(1);
    } else {
      console.log('Connection to database has been established successfully.');
    }
  });


request('https://news.ycombinator.com', function (error, response, html) {
  if(error) { return 1; }
  if (response.statusCode != 200) {
    console.log("Reponse was not success.");
    process.exit(1);
  }

  var $ = cheerio.load(html);

  $('span.comhead').each(function(i, element){
    var a = $(this).prev();
    // console.log("Link: " +a.attr('href'));
    // console.log("Title: " +a.text());
    Article.create({
      title: a.text(),
      link: a.attr('href')
    });
  });
});

