import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './state';
import {State} from "./state/types";
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


store.subscribe(() => {
    const state: State = JSON.parse(JSON.stringify(store.getState()));
    console.log(state);
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
