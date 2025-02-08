import { configureStore } from '@reduxjs/toolkit'
import filesAndFolderSlice from './slice.js'

export default configureStore({
  reducer: {
    filesAndFolder: filesAndFolderSlice
  }
})