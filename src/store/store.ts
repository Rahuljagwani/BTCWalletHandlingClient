import { configureStore, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunk, { ThunkMiddleware } from 'redux-thunk';

const store:any = configureStore({
  reducer: rootReducer,
  middleware: [thunk as ThunkMiddleware<RootState, Action>],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

