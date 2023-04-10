import React from 'react';
import DragnDrop from '../components/DragnDrop';

const TemplateScreen = () => {
  return (
    <div>
      <h2>Cover Letter Template</h2>
      <div className='border-4 inset-0 flex items-center justify-center opacity-0.75'>
        <DragnDrop />
      </div>
    </div>
  );
};

export default TemplateScreen;
