import { configureStore } from '@reduxjs/toolkit'
import divisiSlice from './slices/divisiSlice'
import counterSlice from './slices/counterSlice'
import eventSlice from './slices/eventSlice'
import presenceSlice from './slices/presenceSlice'
import authSlice from './slices/authSlice'
import eventRegisterSlice from './slices/eventRegisterSlice'
import qnaSlice from './slices/qnaSlice'
import likeSlice from './slices/likeSlice'
import feedbackSlice from './slices/feedbackSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth:authSlice,
      divisi:divisiSlice,
      counter:counterSlice,
      event:eventSlice,
      eventRegister:eventRegisterSlice,
      presence:presenceSlice,
      qna:qnaSlice,
      like:likeSlice,
      feedback:feedbackSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']