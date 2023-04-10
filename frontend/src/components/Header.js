import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='h-[8vh] w-full box-border py-1.5 px-8 font-Quicksand'>
      <div className='h-full flex justify-between items-center text-indeed-blue'>
        <h1 className='font-bold text-xl'>
          <Link to='/'>Job Tracker</Link>
        </h1>
        <div className='flex'>
          <p>
            <Link to='/template'>Templater</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
