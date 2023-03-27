import React from 'react';

// an individual job item
const item = ({ job, index }) => {
  return (
    <div
      className={`grid items-center py-3 px-6 gap-x-6 grid-flow-row 
      lg:grid-cols-9 border-b border-indeed-borderInputColor text-sm
      ${index % 2 === 0 && 'even:bg-gray-100'}`}
    >
      <h4>{job.company}</h4>
      <h4>{job.position}</h4>
      <h4 className='truncate text-indeed-blue hover:underline'>
        <a href={job.url} target='_blank'>
          {job.url}
        </a>
      </h4>
      <h4>{job.applied ? 'Yes' : 'No'}</h4>
      <h4>{job.priority}</h4>
      <h4>{job.comments}</h4>
      <h4>{job.salary}</h4>
      <h4>{job.location}</h4>
      <h4>{job.activity}</h4>
    </div>
  );
};

export default item;
