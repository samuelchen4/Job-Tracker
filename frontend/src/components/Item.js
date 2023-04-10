import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createCoverLetter } from '../actions/templateActions';
import { deleteJob } from '../actions/jobActions';

// an individual job item
const Item = ({ job, index }) => {
  const dispatch = useDispatch();

  const createCoverLetterHandler = () => {
    dispatch(createCoverLetter(job));
  };

  const deleteJobHandler = () => {
    const input = window.prompt(`Enter Yes to delete job for ${job.company}!`);
    if (input.toLowerCase() === 'yes') {
      dispatch(deleteJob(job._id, index));
    }
  };

  return (
    <div
      className={`grid items-center py-3 px-6 gap-x-6 grid-flow-row 
      lg:grid-cols-10 border-b border-indeed-borderInputColor text-sm
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
      <div className='flex justify-center text-lg'>
        <button
          onClick={createCoverLetterHandler}
          className='mr-3 hover:transform hover:scale-110 transition duration-100'
        >
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
        <button
          onClick={deleteJobHandler}
          className='hover:transform hover:scale-110 transition duration-100'
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Item;
