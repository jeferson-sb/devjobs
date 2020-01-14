import React, { useEffect, useState } from 'react';
import Job from './Job.jsx';
import JobModal from './JobModal.jsx';

export default function JobList({ jobs }) {
  const [open, setOpen] = useState(false);
  const [selectedJob, selectJob] = useState({});
  const [value, setValue] = useState('');
  const [jobsOnPage, setJobsOnPage] = useState([]);

  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setJobsOnPage(jobs.slice(activeStep * 50, activeStep * 50 + 50));
  }, [jobs]);

  function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    scrollToTop();
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    scrollToTop();
  }

  function handleStep(step) {
    setActiveStep(prevActiveStep => step - 1);
  }

  function handleChange(e) {
    const v = e.target.value;
    if (v) {
      setValue(v.toLowerCase());
      const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(value)
      );
      setJobsOnPage(filteredJobs);
    }
  }

  return (
    <div className='jobs'>
      <JobModal
        open={open}
        job={selectedJob}
        handleClose={() => setOpen(false)}
      />
      <h2 className='title'>Entry Level Software Jobs</h2>
      <h3 className='subtitle is-3'>Showing {jobsOnPage.length} Jobs</h3>
      <h4 className='is-4'>Total of {numJobs} Github Jobs</h4>
      <input
        className='input'
        type='search'
        placeholder='Front end ...'
        onChange={handleChange}
      />

      {jobsOnPage.map((job, i) => (
        <Job
          key={i}
          job={job}
          onClick={() => {
            setOpen(true);
            selectJob(job);
          }}
        />
      ))}
      <div>
        Page {activeStep + 1} of {numPages}
      </div>
      <nav
        className='pagination is-rounded'
        role='navigation'
        aria-label='pagination'
      >
        <button
          className='pagination-previous'
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button
          className='pagination-next'
          onClick={handleNext}
          disabled={activeStep === numPages - 1}
        >
          Next page
        </button>
        <ul className='pagination-list'>
          {activeStep + 1 !== 1 && (
            <>
              <li>
                <button
                  className='pagination-link'
                  aria-label='Goto page 1'
                  onClick={() => handleStep(1)}
                >
                  1
                </button>
              </li>
              <li>
                <span className='pagination-ellipsis'>&hellip;</span>
              </li>
            </>
          )}
          <li>
            <button
              className='pagination-link is-current'
              aria-label={`Page ${activeStep + 1}`}
              aria-current='page'
            >
              {activeStep + 1}
            </button>
          </li>
          {numPages !== activeStep + 1 && (
            <>
              <li>
                <span className='pagination-ellipsis'>&hellip;</span>
              </li>
              <li>
                <button
                  className='pagination-link'
                  aria-label={`Goto page ${numPages}`}
                  onClick={() => handleStep(numPages)}
                >
                  {numPages}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
