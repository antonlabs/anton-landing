import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './state';
import {State} from "./state/types";
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyB55QAbfc2f7auyvXH7ny85mNUpBqkATao",
    authDomain: "anton-landing.firebaseapp.com",
    projectId: "anton-landing",
    storageBucket: "anton-landing.appspot.com",
    messagingSenderId: "419306989754",
    appId: "1:419306989754:web:636ae7d34df0513c313a83",
    measurementId: "G-HLF8VLJ242"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);


store.subscribe(() => {
    const state: State = JSON.parse(JSON.stringify(store.getState()));
    delete state.newsletter.error;
    localStorage.setItem('state', JSON.stringify(state))
})

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <GoogleReCaptchaProvider
            reCaptchaKey="6Ldd2RQeAAAAABidUe7PPYzpYUnwIa599ZatjTf_"
        >
            <App />
        </GoogleReCaptchaProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
