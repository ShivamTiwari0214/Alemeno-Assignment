// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './courseSlice'; // Assuming you have a slice for courses

export const store = configureStore({
  reducer: {
    courses: courseReducer,
  },
});
