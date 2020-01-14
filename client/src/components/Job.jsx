import React from 'react';

const ONE_DAY_MS = 24 * 3600 * 1000;

const getMDY = ts =>
  ts
    .toDateString()
    .split(' ')
    .slice(0, 3)
    .join(' ');

function makeDate(timestamp) {
  const date = new Date(timestamp);
  const dateStr = getMDY(date);
  const todayStr = getMDY(new Date());
  const yesterdayStr = getMDY(new Date(Date.now() - ONE_DAY_MS));

  if (dateStr === todayStr) {
    return 'today';
  } else if (dateStr === yesterdayStr) {
    return 'yesterday';
  } else {
    return dateStr;
  }
}

export default function Job({ job, onClick }) {
  return (
    <div className='box' onClick={onClick}>
      <div className='content'>
        <h4 className='title is-5'>{job.title}</h4>
        <h5 className='subtitle is-6'>{job.company}</h5>
        <small>{job.location}</small>
        <p>{makeDate(job.created_at)}</p>
      </div>
    </div>
  );
}
