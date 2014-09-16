# Topher Coinmarket Scrape

JSON API to cryptocurrency prices using Node.js, cheerio, and Postgres.


### DB setup

* Start server on port 5432

* `CREATE DATABASE periscrape`

* `CREATE ROLE topher WITH PASSWORD 'Aa12345678'`

### Start server 

`node scrape.js`

### Endpoints


#### `/`

Lists all cryptocurrencies name and price


#### `/prices`

Lists just bare prices

#### `/price/:name`

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


