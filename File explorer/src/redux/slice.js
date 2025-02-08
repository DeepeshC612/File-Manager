import { createSlice, configureStore } from "@reduxjs/toolkit";

const filesAndFolderSlice = createSlice({
  name: "filesAndFolder",
  initialState: {
    files: [
      {
        name: "Image.jpg",
        key: "1",
        extension: "JPG",
        descriptions: "test file 1",
        folderName: "Folder 2",
        folderId: "2",
        fileType: "image",
      },
      {
        name: "Image2.png",
        key: "2",
        extension: "PNG",
        descriptions: "test file",
        folderName: "Folder 2",
        folderId: "2",
        fileType: "image",
      },
      {
        name: "video.mp4",
        key: "3",
        extension: "MP4",
        descriptions: "test file",
        folderName: "Folder 3",
        folderId: "3",
        fileType: "video",
      },
      {
        name: "Text File.txt",
        key: "4",
        extension: "TXT",
        descriptions: "test file",
        folderName: "Folder 3",
        folderId: "3",
        fileType: "text",
      },
      {
        name: "Text File.txt",
        key: "5",
        extension: "TXT",
        descriptions: "test file",
        folderName: "Sub Folder",
        folderId: "sub1",
        fileType: "text",
      },
    ],
  },
  reducers: {
    storeData: (state, action) => {
      state.files = action.payload;
    },
    editData: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { storeData, editData } = filesAndFolderSlice.actions;

export default filesAndFolderSlice.reducer;
