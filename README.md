# Topher Coinmarket Scrape

JSON API for cryptocurrency prices using Node.js, cheerio, and Postgres.


## Getting Started

`git clone git@github.com:topher6345/periscrape.git`

`cd periscrape`

`npm install`

### DB setup

* Start server on port 5432

* `CREATE DATABASE periscrape`

* `CREATE ROLE topher WITH PASSWORD 'Aa12345678'`

### Start server 

`node scrape.js`

will start on `localhost:3000`

### Endpoints


#### All

`/`

Lists all cryptocurrencies name and price


#### Prices

`/prices`

Lists just bare prices

#### Price by name

`/price/:name`

Lists price by route `:name`

Example: 

`localhost:3000/price/Bitcoin`

```javascript
[
  {
    price: "$ 466.00"
  }
]
```


