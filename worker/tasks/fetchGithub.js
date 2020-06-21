const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient({ host: 'redis' });
const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  console.log('Fetching data ...');
  let resultCount = 1;
  let onPage = 0;
  const allJobs = [];

  while (resultCount > 0) {
    const res = await fetch(`${baseUrl}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    onPage++;
  }
  console.log(`Get ${allJobs.length} jobs.`);

  const jrJobs = filterJuniorJobs(allJobs);

  console.log(`Get ${jrJobs.length} JUNIOR jobs.`);
  const success = await setAsync('github', JSON.stringify(jrJobs));
  console.log({ success });
}

function filterJuniorJobs(allJobs) {
  const jrJobs = allJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();
    if (
      jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect')
    ) {
      return false;
    }
    return true;
  });
  return jrJobs;
}

module.exports = fetchGithub;
