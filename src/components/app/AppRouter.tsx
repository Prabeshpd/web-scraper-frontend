import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

import SidebarLayout from '../sidebar/SidebarLayout';
import TopBar from '../topbar/Topbar';
import Tags from '../tag/Tags';
import SearchDetail from '../searchPage/SearchDetail';
import SearchPage from '../searchPage/SearchPage';

function Router() {
  return (
    <ProSidebarProvider>
      <TopBar />
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <SidebarLayout />
        <Routes>
          <Route path="/tags" element={<Tags />} />
          <Route path="/results" element={<SearchPage />} />
          <Route path="/results/:id" element={<SearchDetail />} />
        </Routes>
      </div>
    </ProSidebarProvider>
  );
}

export default Router;
