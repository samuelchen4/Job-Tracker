import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_JOB_REQUEST,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
  GET_JOB_REQUEST,
  GET_JOB_SUCCESS,
  GET_JOB_FAIL,
  PARSE_JOB_REQUEST,
  PARSE_JOB_SUCCESS,
  PARSE_JOB_FAIL,
} from '../constants/jobConstants';

export const jobListReducer = createReducer(
  { jobList: [], isLoading: false },
  (builder) => {
    builder
      .addCase(GET_JOB_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_JOB_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.jobList = action.payload;
      })
      .addCase(GET_JOB_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(ADD_JOB_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(ADD_JOB_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.jobList.push(action.payload);
      })
      .addCase(ADD_JOB_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addDefaultCase((state) => state);
  }
);

// parsedJob is an object
export const parsedJobReducer = createReducer({ jobInfo: {} }, (builder) => {
  builder
    .addCase(PARSE_JOB_REQUEST, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    })
    .addCase(PARSE_JOB_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.jobInfo = action.payload;
    })
    .addCase(PARSE_JOB_FAIL, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.jobInfo = {};
      state.err = action.payload;
    })
    .addDefaultCase((state) => state);
});
