import { createReducer } from '@reduxjs/toolkit';
import { SAVE_TEMPLATE_SUCCESS } from '../constants/templateConstants';

export const templateReducer = createReducer(
  { encodedTemplate: '' },
  (builder) => {
    builder
      .addCase(SAVE_TEMPLATE_SUCCESS, (state, action) => {
        state.encodedTemplate = action.payload;
      })
      .addDefaultCase((state) => state);
  }
);
