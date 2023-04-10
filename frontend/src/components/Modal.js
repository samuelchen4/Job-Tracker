import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob } from '../actions/jobActions';
import Message from './Message';

const Modal = ({ isModalOpenHandler }) => {
  const dispatch = useDispatch();
  const parsedJob = useSelector((state) => state.parsedJob);
  const { jobInfo, isSuccess, err } = parsedJob;
  const { company, position, url, salary, activity, location } = jobInfo;

  // combine all the local states into a formData variable
  const [formData, setFormData] = useState({
    company,
    position,
    url,
    salary,
    activity,
    location,
    applied: false,
    priority: 'low',
    comments: '',
  });

  // make handler that sets value for different attributes
  const onChangeFormDataHandler = (e) => {
    const copyData = { ...formData };

    if (e.target.name === 'applied') {
      // had to handle specific case, bc true false isnt working
      copyData[e.target.name] = !copyData[e.target.name];
    } else {
      copyData[e.target.name] = e.target.value;
    }

    // console.log(copyData);
    setFormData(copyData);
  };

  const addJobHandler = async (e) => {
    e.preventDefault();
    const reqData = { ...formData };
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
              <input
                name='company'
                value={formData.company}
                onChange={onChangeFormDataHandler}
              />
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Position:</span>{' '}
              <input
                name='position'
                value={formData.position}
                onChange={onChangeFormDataHandler}
              />
            </p>

            <p className='mb-3'>
              <span className='font-semibold mr-1 mr-1'>Salary:</span>{' '}
              <input
                name='salary'
                value={formData.salary}
                onChange={onChangeFormDataHandler}
              />
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1 mr-1'>Location:</span>
              <input
                name='location'
                value={formData.location}
                onChange={onChangeFormDataHandler}
              />
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1 mr-1'>Activity:</span>
              <input
                name='activity'
                value={formData.activity}
                onChange={onChangeFormDataHandler}
              />
            </p>
            <div className='mb-3'>
              <label>
                <span className='font-semibold mr-1'>Applied:</span>
              </label>
              <label className='mr-0.5' htmlFor='yes'>
                Yes
              </label>
              <input
                name='applied'
                type='checkbox'
                id='yes'
                className='mr-1'
                checked={formData.applied}
                onChange={onChangeFormDataHandler}
              />
              <label className='mr-0.5' htmlFor='no'>
                No
              </label>
              <input
                name='applied'
                type='checkbox'
                id='no'
                className='mr-1'
                checked={!formData.applied}
                onChange={onChangeFormDataHandler}
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
                name='priority'
                type='checkbox'
                value='low'
                id='low'
                className='mr-1'
                checked={formData.priority === 'low'}
                onChange={onChangeFormDataHandler}
              />
              <label htmlFor='medium' className='mr-0.5'>
                Medium
              </label>
              <input
                name='priority'
                type='checkbox'
                value='medium'
                id='medium'
                className='mr-1'
                checked={formData.priority === 'medium'}
                onChange={onChangeFormDataHandler}
              />
              <label htmlFor='high' className='mr-0.5'>
                High
              </label>
              <input
                name='priority'
                type='checkbox'
                value='high'
                id='high'
                className='mr-1'
                checked={formData.priority === 'high'}
                onChange={onChangeFormDataHandler}
              />
            </div>
            <div className='mb-3 flex items-start'>
              <label>
                <span className='font-semibold mr-1'>Comments:</span>
              </label>
              <textarea
                name='comments'
                className='resize-y w-full h-[32px]'
                onChange={onChangeFormDataHandler}
                value={formData.comments}
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
