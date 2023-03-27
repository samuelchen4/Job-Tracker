import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseJob } from '../actions/jobActions';
import Loader from './Loader';

const ItemAdder = ({ isModalOpenHandler }) => {
  const dispatch = useDispatch();
  const parsedJob = useSelector((state) => state.parsedJob);
  const { isLoading } = parsedJob;

  const [url, setUrl] = useState('');

  const onChangeHandler = (e) => setUrl(e.target.value);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(parseJob(url));
    isModalOpenHandler();
    setUrl('');
  };

  return (
    <>
      {isLoading && (
        <Loader color={'#ffffff'} isLoading={true} message={'Parsing...'} />
      )}
      <div
        className='absolute bottom-0 right-0 border-2 rounded-lg 
    py-5 px-7 text-left bg-gray-100 drop-shadow-md mb-2 mr-2 text-md'
      >
        <form className='flex flex-col' onSubmit={onSubmitHandler}>
          <label className='mb-1'>Indeed Url:</label>
          <div className='mb-1 border-2 border-indeed-borderInputColor rounded-sm'>
            <input
              type='url'
              value={url}
              className='border-r-2 py-0.5'
              onChange={onChangeHandler}
            />
            <button
              className='bg-[#5dc7ae] px-2 py-0.5 text-white font-semibold hover:bg-[#4ba28d]'
              type='submit'
            >
              add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemAdder;
