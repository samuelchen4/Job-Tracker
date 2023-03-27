import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob } from '../actions/jobActions';
import Message from './Message';

const Modal = ({ isModalOpenHandler }) => {
  const dispatch = useDispatch();
  const parsedJob = useSelector((state) => state.parsedJob);
  const { jobInfo, isSuccess, err } = parsedJob;
  const { company, position, salary, activity, location } = jobInfo;

  const [applied, setApplied] = useState(false);
  const [priority, setPriority] = useState('low');
  const [comments, setComments] = useState('');

  const changeAppliedHandler = () => {
    setApplied(!applied);
  };

  const changePriorityHandler = (e) => {
    setPriority(e.target.value);
  };

  const changeCommentsHandler = (e) => {
    setComments(e.target.value);
  };

  const addJobHandler = async (e) => {
    e.preventDefault();

    const reqData = {
      ...jobInfo,
      applied,
      priority,
      comments,
    };

    await dispatch(addJob(reqData));
    isModalOpenHandler();
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center'>
      <div className=' border-4 rounded-md py-4 px-8 bg-gray-100 text-lg'>
        <header className='flex justify-between'>
          <h2 className='mb-6 font-semibold text-2xl'>Modal:</h2>
          <p>
            <button onClick={isModalOpenHandler}>exit</button>
          </p>
        </header>
        {isSuccess ? (
          <form onSubmit={addJobHandler} className='flex flex-col text-xl'>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Company:</span>
              {company}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Position:</span> {position}
            </p>

            <p className='mb-3'>
              <span className='font-semibold mr-1 mr-1'>Salary:</span> {salary}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1 mr-1'>Location:</span>{' '}
              {location}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1 mr-1'>Activity:</span>{' '}
              {activity}
            </p>
            <div className='mb-3'>
              <label>
                <span className='font-semibold mr-1'>Applied:</span>
              </label>
              <label className='mr-0.5' htmlFor='yes'>
                Yes
              </label>
              <input
                type='checkbox'
                id='yes'
                className='mr-1'
                checked={applied}
                onChange={changeAppliedHandler}
              />
              <label className='mr-0.5' htmlFor='no'>
                No
              </label>
              <input
                type='checkbox'
                id='no'
                className='mr-1'
                checked={!applied}
                onChange={changeAppliedHandler}
              />
            </div>
            <div className='mb-3'>
              <label>
                <span className='font-semibold mr-1'>Priority:</span>
              </label>
              <label htmlFor='low' className='mr-0.5'>
                Low
              </label>
              <input
                type='checkbox'
                value='low'
                id='low'
                className='mr-1'
                checked={priority === 'low'}
                onChange={changePriorityHandler}
              />
              <label htmlFor='medium' className='mr-0.5'>
                Medium
              </label>
              <input
                type='checkbox'
                value='medium'
                id='medium'
                className='mr-1'
                checked={priority === 'medium'}
                onChange={changePriorityHandler}
              />
              <label htmlFor='high' className='mr-0.5'>
                High
              </label>
              <input
                type='checkbox'
                value='high'
                id='high'
                className='mr-1'
                checked={priority === 'high'}
                onChange={changePriorityHandler}
              />
            </div>
            <div className='mb-3 flex items-start'>
              <label>
                <span className='font-semibold mr-1'>Comments:</span>
              </label>
              <textarea
                className='resize-y w-full h-[32px]'
                onChange={changeCommentsHandler}
                value={comments}
                maxLength={500}
              />
            </div>
            <div className='flex justify-between'>
              <button onClick={isModalOpenHandler}>Cancel</button>
              <button type='submit'>Confirm</button>
            </div>
          </form>
        ) : (
          <Message message={err} />
        )}
      </div>
    </div>
  );
};

export default Modal;
