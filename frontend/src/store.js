import { configureStore } from '@reduxjs/toolkit';
import { jobListReducer, parsedJobReducer } from './reducers/jobReducer';

const store = configureStore({
  reducer: {
    jobsList: jobListReducer,
    parsedJob: parsedJobReducer,
  },
});

export default store;
