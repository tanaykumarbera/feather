import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import FHome from '../containers/home';

const FRouter = () => {
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <div className="feather-wrap">
        <Route exact path="/" component={FHome} />
      </div>
    </BrowserRouter>
  );
};

export default FRouter;
