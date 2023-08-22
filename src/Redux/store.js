import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../features/card/cardSlice'
import { apiSlice } from 'features/apiSlice'

export const store = configureStore({
  reducer: {
    game: cardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})