import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

 
type ThemeState = {
  isDark: boolean;
};
 
const initialState: ThemeState = {
  isDark: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
})

export const { toggleTheme } = counterSlice.actions

export const selectIsDark = (state: { counter: ThemeState }) => state.counter.isDark;

export default counterSlice.reducer