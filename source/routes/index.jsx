import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Comp from '../components/base';

export default function FRouter() {
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <div className="feather-wrap">
        <Route exact path="/" component={Comp} />
      </div>
    </BrowserRouter>
  );
}
