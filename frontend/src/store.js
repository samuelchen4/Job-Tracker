import { configureStore } from '@reduxjs/toolkit';
import { jobListReducer, parsedJobReducer } from './reducers/jobReducer';
import { templateReducer } from './reducers/templateReducer';

const store = configureStore({
  reducer: {
    jobsList: jobListReducer,
    parsedJob: parsedJobReducer,
    template: templateReducer,
  },
});

export default store;
