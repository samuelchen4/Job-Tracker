import React from 'react';

const Title = () => {
  return (
    <div
      className='grid py-1.5 px-6 gap-x-6 lg:grid-cols-9 
    font-bold text-lg align-items bg-gray-200 border-black border-y drop-shadow-md'
    >
      <h3>Company</h3>
      <h3>Position</h3>
      <h3>Url</h3>
      <h3>Applied</h3>
      <h3>Priority</h3>
      <h3>Notes</h3>
      <h3>Salary</h3>
      <h3>Location</h3>
      <h3>Activity</h3>
    </div>
  );
};

export default Title;
