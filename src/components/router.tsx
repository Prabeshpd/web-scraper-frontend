import * as React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './login/login';
import Signup from './signup/signup';
import PrivateRouteOutlet from './privateRouter';
import AppRouter from './app/AppRouter';
// import Tags from './tag/Tags';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<PrivateRouteOutlet />}>
          <Route path="*" element={<AppRouter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
