const routes = require('express').Router();
const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({ host: 'redis' });
const getAsync = promisify(client.get).bind(client);

routes.get('/jobs', async (req, res) => {
  try {
    const jobs = await getAsync('github');
    return res.status(200).send(jobs);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = routes;
