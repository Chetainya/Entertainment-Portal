import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store , persistor } from './Store/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  {/* <StrictMode> */}
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  {/* </StrictMode> */}
  
  </Provider>
)
