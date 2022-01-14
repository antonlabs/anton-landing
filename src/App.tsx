import React from 'react';
import './App.scss';
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import {Layout} from "./components/Layout/Layout";
import Home from "./views/Home/Home";



export const App = (): JSX.Element => {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
