const express = require('express');
var cors = require('cors');
const app = express();
const axios = require('axios');
const NodeCache = require('node-cache');
const port = 3003;

const cache = new NodeCache();

app.use(cors());

app.get('/api/f1/:season/:round?/:type?', (req, res) => {
  const { season, round, type } = req.params;
  const cachedData = cache.get(req.url);

  if (cachedData) {
    console.log();

    res.json(cachedData);

    return
  }

  let apiURL = `https://ergast.com/api/f1/${season}`;

  if (round) {
    apiURL += `/${round}`;
  }

  if (type) {
    apiURL += `/${type}`;
  }

  axios.get(apiURL)
  .then(apiRes => {
    cache.set(req.url, apiRes.data, 10000);

    res.json(apiRes.data);
  })
  .catch(error => {
    console.log(error);
  });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});