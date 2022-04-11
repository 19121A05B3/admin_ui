import { configureStore } from "@reduxjs/toolkit";
import mainSliceReducer from "./slices/mainSlice";
import loginSliceReducer from "./slices/loginCheck";

const store = configureStore({
  reducer: {
    main: mainSliceReducer,
    login: loginSliceReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
