var request = require('request')
const express = require('express')
const dotenv = require('dotenv');
const app = express()
const fs = require('fs')
const { post } = require('request')
const { response } = require('express')
const port = 8081

dotenv.config({ path: './.env' });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/endpoint', (req, res) => {
    let url = `https://newsapi.org/v2/everything?
    q=${req.query.keyword}
    &sortBy=${req.query.filter}
    &apiKey=${process.env.MY_API_KEY}`
    url = url.replace(/\s+/g, '')
    var options = {
        url: url,
        headers: {
            'User-Agent': 'Shovel'
        }
    }
    request(options,
        function(error, response, body){
            
            if (!error && response.statusCode == 200) {
                res.send(body)
            }
        })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})