// import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Redux/User/UserSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const Store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

const persistor = persistStore(Store);

export { Store, persistor };
