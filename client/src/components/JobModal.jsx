import React, { forwardRef } from 'react';

export default function JobModal({ job, open, handleClose }) {
  if (!job.title) {
    return <div />;
  }

  return (
    <div className={`modal ${open ? 'is-active' : ''}`}>
      <div className='modal-background' onClick={handleClose}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>
            {job.title} - {job.company}
          </p>
          <button
            className='modal-close'
            aria-label='close'
            onClick={handleClose}
          >
            X
          </button>
        </header>
        <section className='modal-card-body'>
          <img className={'image'} src={job.company_logo} alt='Company logo' />
          <span className='tag is-light'>{`from ${job.location}`}</span>
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></div>
        </section>
        <footer className='modal-card-foot'>
          <a
            className='button is-success'
            href={job.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Apply
          </a>
          <button className='button' onClick={handleClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
