import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import { saveTemplate } from '../actions/templateActions';

const DragnDrop = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  return (
    <Dropzone
      accept={['.docx']}
      multiple={false}
      onDrop={(acceptedFiles) => {
        dispatch(saveTemplate(acceptedFiles[0]));
        setFile(acceptedFiles[0]);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className='flex flex-col align-center'>
          <section>
            <h2>make object element with the pdf version of document</h2>
          </section>
          <section>
            <div
              className='my-3 p-[20px] border-2 border-dashed rounded-sm text-[#bdbdbd] hover:underline hover:cursor-pointer'
              {...getRootProps()}
            >
              <input type='file' {...getInputProps()} />
              <p>Drag 'n' drop docx file here, or click to select file</p>
            </div>
          </section>
          <aside className='flex justify-between'>
            <h4>File</h4>
            <p>{file.path ? file.path : 'no file selected...'}</p>
          </aside>
        </div>
      )}
    </Dropzone>
  );
};

export default DragnDrop;
