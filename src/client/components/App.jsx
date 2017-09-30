import React from 'react';
import SidebarComponent from 'components/Sidebar';
import ContentComponent from './ContentComponent';

const App = () => (
  <div id="main-view">
    <SidebarComponent />
    <ContentComponent />
  </div>
);

export default App;
