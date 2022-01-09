import React from 'react';
import './App.scss';
import {BrowserRouter, Navigate, Routes} from "react-router-dom";
import {Route} from "react-router";
import {Layout} from "./components/Layout/Layout";
import {Home} from "./views/Home/Home";
import {OrdersList} from "./views/OrdersList/OrdersList";
import {OrdersLayout} from "./components/OrdersLayout/OrdersLayout";


export const App = (): JSX.Element => {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='orders' element={<OrdersLayout />}>
                      <Route index element={<Navigate to={'buy'} />} />
                      <Route path={'buy'} element={<OrdersList side={'buy'}/>} />
                      <Route path={'sell'} element={<OrdersList side={'sell'}/>} />
                      <Route path={'history'} element={<OrdersList side={'history'}/>} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
