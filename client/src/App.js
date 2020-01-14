import React, { useEffect, useState } from 'react';
import './App.scss';
import JobList from './components/JobList.jsx';

const JOB_API_URL = 'http://localhost:3001/api/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
}

function App() {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetchJobs(setJobList);
  }, []);

  return (
    <section className='section'>
      <div className='container'>
        <JobList jobs={jobList} />
      </div>
    </section>
  );
}

export default App;
