import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
 
console.log(filename)
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmitFile = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      console.log(filePath)
      props.handleStateChange(filePath);

    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Fragment>

        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input form-control'
            id='customFile'
            onChange={onChange}
          />
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4 form-control'
          onClick={onSubmitFile}
        />

      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <img style={{ width: '50%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;