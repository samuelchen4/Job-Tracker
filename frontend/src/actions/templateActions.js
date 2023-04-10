import Axios from 'axios';

import {
  CREATE_COVERLETTER_FAIL,
  CREATE_COVERLETTER_REQUEST,
  CREATE_COVERLETTER_SUCCESS,
  SAVE_TEMPLATE_SUCCESS,
} from '../constants/templateConstants';

// saves the template to state
// eventually save template in db
export const saveTemplate = (template) => async (dispatch) => {
  try {
    // read file contents and convert to base64 encoded string
    const formData = new FormData();
    formData.append('template', template);

    const { data: fileInfo } = await Axios.post(
      '/api/template/save',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch({ type: SAVE_TEMPLATE_SUCCESS, payload: fileInfo });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const createCoverLetter = (jobInfo) => async (dispatch, useState) => {
  try {
    dispatch({ type: CREATE_COVERLETTER_REQUEST });

    // have to set the responseType to arraybuffer instead of the default, JSON
    const { data: buffer, headers } = await Axios.get('/api/template/create', {
      params: {
        ...jobInfo,
      },
      responseType: 'arraybuffer',
    });
    const contentDisposition = headers.get('Content-Disposition');
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
    const filename = filenameMatch ? filenameMatch[1] : 'Cover Letter.docx';

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    dispatch({ type: CREATE_COVERLETTER_SUCCESS });
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: CREATE_COVERLETTER_FAIL,
      payload: err.response.data.message,
    });
  }
};
