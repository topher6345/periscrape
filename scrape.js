var request = require('request');
var cheerio = require('cheerio');

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

