import {
  ADD_JOB_FAIL,
  ADD_JOB_REQUEST,
  ADD_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  GET_JOB_FAIL,
  GET_JOB_REQUEST,
  GET_JOB_SUCCESS,
  PARSE_JOB_FAIL,
  PARSE_JOB_REQUEST,
  PARSE_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
} from '../constants/jobConstants';
import Axios from 'axios';

// HTTP method - post
// inputs - data object
// desc - adds data object to db
export const addJob = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_JOB_REQUEST });
    const { data: resData } = await Axios.post('/api/jobs', reqData);
    dispatch({ type: ADD_JOB_SUCCESS, payload: resData });
  } catch (err) {
    dispatch({ type: ADD_JOB_FAIL, payload: err.response.data.message });
  }
};

export const getJobs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_JOB_REQUEST });
    const { data } = await Axios.get(`/api/jobs`);
    dispatch({ type: GET_JOB_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_JOB_FAIL, payload: err.response.data.message });
  }
};

export const updateJob = (_id, updateObj, index) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_JOB_REQUEST });
    const { data } = await Axios.put(`/api/jobs/update/${_id}`, {
      updateObj,
    });
    dispatch({ type: UPDATE_JOB_SUCCESS, payload: data, index });
  } catch (err) {
    dispatch({ type: UPDATE_JOB_FAIL, payload: err.response.data.message });
  }
};

export const parseJob = (url) => async (dispatch) => {
  try {
    dispatch({ type: PARSE_JOB_REQUEST });
    const encodedUrl = encodeURIComponent(url);
    const { data } = await Axios.get(`/api/jobs/${encodedUrl}`);
    dispatch({ type: PARSE_JOB_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PARSE_JOB_FAIL, payload: err.response.data.message });
  }
};

//sends delete request based on _id
export const deleteJob = (_id, index) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_JOB_REQUEST });
    await Axios.delete('/api/jobs/delete', { data: { _id } });
    dispatch({ type: DELETE_JOB_SUCCESS, payload: index });
  } catch (err) {
    dispatch({ type: DELETE_JOB_FAIL, payload: err.response.data.message });
  }
};
