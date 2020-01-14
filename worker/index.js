const CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetchGithub');

new CronJob('5 * * * *', fetchGithub, null, true, 'America/Los_Angeles');
