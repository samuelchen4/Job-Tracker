import React from 'react';

const Header = () => {
  return (
    <div className='h-[8vh] w-full box-border py-1.5 px-8 font-Quicksand'>
      <div className='h-full flex justify-between items-center text-indeed-blue'>
        <h1 className='font-bold text-2xl'>Job Tracker</h1>
        <div className='flex'>
          <p className='mr-3'>Dropdown</p>
          <p>swag</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
