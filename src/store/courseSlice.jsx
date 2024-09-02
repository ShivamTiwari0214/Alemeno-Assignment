// src/store/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: [],
  reducers: {
    setCourses: (state, action) => {
      return action.payload;
    },
    // Add more reducers if needed
  },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
