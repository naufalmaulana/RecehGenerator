import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './appSlice'  // adjust path if needed

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch