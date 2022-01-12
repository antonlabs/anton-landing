import React, {lazy, Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Navigate} from "react-router-dom";
import {Route, Router, Routes} from "react-router";
import {Layout} from "./components/Layout/Layout";
import Home from "./views/Home/Home";


const OrdersLayout = lazy(() => import('./components/OrdersLayout/OrdersLayout'))
const OrdersList = lazy(() => import('./views/OrdersList/OrdersList'))

export const App = (): JSX.Element => {
    return (
      <BrowserRouter>
          <Suspense fallback={<div>Page loading...</div>}>
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
          </Suspense>
      </BrowserRouter>
  );
}

export default App;
