import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import loginReducer from './loginSlice'

export default configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer
  }
})