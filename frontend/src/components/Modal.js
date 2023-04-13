import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, updateJob } from '../actions/jobActions';
import Message from './Message';

const Modal = ({ isModalOpenHandler, reducerSlice, itemIndex, title = '' }) => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state[reducerSlice]);

  // from parsedJob state
  // global variable for the job info, depending on if jobInfo or jobList is passed in
  let data = {};

  if (reducerSlice === 'parsedJob') {
    data = job.jobInfo;
  } else {
    data = job.jobList[itemIndex];
  }
  const { isSuccess, err } = job;
  const {
    company,
    position,
    url,
    salary,
    activity,
    location,
    _id = '',
    applied = false,
    priority = 'low',
    comments = '',
  } = data;

  // combine all the local states into a formData variable
  const [formData, setFormData] = useState({
    company,
    position,
    url,
    salary,
    activity,
    location,
    applied,
    priority,
    comments,
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

    setFormData(copyData);
  };

  const addJobHandler = async (e) => {
    e.preventDefault();
    const reqData = { ...formData };
    // if _id !== '' pass in pass in patch instead
    if (_id !== '') {
      dispatch(updateJob(_id, reqData, itemIndex));
    } else {
      await dispatch(addJob(reqData));
    }
    isModalOpenHandler();
  };

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center'>
      <div className=' border-4 rounded-md py-4 px-8 bg-gray-100'>
        <header className='flex justify-between'>
          <h2 className='mb-6 font-semibold text-xl'>{title}</h2>
          <p>
            <button
              onClick={isModalOpenHandler}
              className='hover:transform hover:scale-110 transition duration-100'
            >
              <FontAwesomeIcon icon={faX} style={{ color: '#000000' }} />
            </button>
          </p>
        </header>
        {isSuccess ? (
          <form onSubmit={addJobHandler} className='grid gap-x-4 text-sm'>
            <div className='ml-3 flex flex-col space-y-4 items-end'>
              <p className='py-1 rounded-md border border-gray-100'>Company:</p>
              <p className='py-1 rounded-md border border-gray-100'>
                Position:
              </p>
              <p className='py-1 rounded-md border border-gray-100'>Salary:</p>
              <p className='py-1 rounded-md border border-gray-100'>
                Location:
              </p>
              <p className='py-1 rounded-md border border-gray-100'>
                Activity:
              </p>
              <p className='py-1 rounded-md border border-gray-100'>Applied:</p>
              <p className='py-1 rounded-md border border-gray-100'>
                Priority:
              </p>
              <p className='py-1 rounded-md border border-gray-100'>
                Comments:
              </p>
            </div>
            <div className='mr-3 flex flex-col space-y-4 min-w-[300px]'>
              <input
                className='rounded-md border border-grey-100 px-2 py-1 w-full'
                name='company'
                value={formData.company}
                onChange={onChangeFormDataHandler}
              />
              <input
                className='rounded-md border border-grey-100 px-2 py-1 w-full'
                name='position'
                value={formData.position}
                onChange={onChangeFormDataHandler}
              />

              <input
                className='rounded-md border border-grey-100 px-2 py-1 w-full'
                name='salary'
                value={formData.salary}
                onChange={onChangeFormDataHandler}
              />

              <input
                className='rounded-md border border-grey-100 px-2 py-1 w-full'
                name='location'
                value={formData.location}
                onChange={onChangeFormDataHandler}
              />

              <input
                className='rounded-md border border-grey-100 px-2 py-1 w-full'
                name='activity'
                value={formData.activity}
                onChange={onChangeFormDataHandler}
              />
              <div className='self-center rounded-md border border-gray-100 py-1'>
                <label className='mr-0.5' htmlFor='yes'>
                  Yes
                </label>
                <input
                  name='applied'
                  type='checkbox'
                  id='yes'
                  className='mr-1.5'
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
                  className='mr-0.5'
                  checked={!formData.applied}
                  onChange={onChangeFormDataHandler}
                />
              </div>
              <div className='self-center rounded-md border border-gray-100 py-1'>
                <label htmlFor='low' className='mr-0.5'>
                  Low
                </label>
                <input
                  name='priority'
                  type='checkbox'
                  value='low'
                  id='low'
                  className='mr-1.5'
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
                  className='mr-1.5'
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
                  className='mr-1.5'
                  checked={formData.priority === 'high'}
                  onChange={onChangeFormDataHandler}
                />
              </div>
              <textarea
                wrap='soft'
                name='comments'
                className='resize-y min-h-[100px] w-full h-[32px] rounded-md border px-2 py-1'
                onChange={onChangeFormDataHandler}
                value={formData.comments}
                maxLength={500}
              />
            </div>
            <div className='mt-4 col-span-2 flex justify-between'>
              <button
                onClick={isModalOpenHandler}
                className='hover:transform hover:scale-110 transition duration-100'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='hover:transform hover:scale-110 transition duration-100'
              >
                Confirm
              </button>
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
