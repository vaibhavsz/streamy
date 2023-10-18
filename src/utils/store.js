import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./redux/appSlice";
import searchSlice from "./redux/searchSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
  },
});

export default store;
