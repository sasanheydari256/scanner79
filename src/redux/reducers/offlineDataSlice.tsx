import { createSlice } from '@reduxjs/toolkit';

const offlineDataSlice = createSlice({
  name: 'offlineData',
  initialState: {
    data: [], // آرایه‌ای از آبجکت‌های ذخیره شده آفلاین
  },
  reducers: {
    addOfflineData: (state, action) => {
      // اضافه کردن داده جدید به آرایه
      state.data.push(action.payload);
    },
    clearOfflineData: (state) => {
      state.data = [];
    },
  },
});

export const { addOfflineData, clearOfflineData } = offlineDataSlice.actions;
export default offlineDataSlice.reducer;
