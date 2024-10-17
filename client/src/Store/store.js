// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice'; // Import the auth slice

// export const store = configureStore({
//   reducer: {
//     auth: authReducer, // Add auth slice to the store
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import rootReducer from './rootReducer'; // Your combined reducers
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Persist Config for authReducer
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'], // Only persist the auth reducer
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Optionally ignore paths in the state that are non-serializable
        ignoredPaths: ['some.nested.path'],  // Customize if needed
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
