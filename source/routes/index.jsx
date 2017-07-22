import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FHome from '../containers/home';
import FList from '../containers/list';
import FPost from '../containers/post';

const FRouter = () => {
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <div className="feather-wrap">
        <Switch>
          <Route exact path="/" component={FHome} />
          <Route path="/posts" component={FList} bla="blue" />
          <Route
            path="/tag/:slug"
            render={routeProps => <FList {...routeProps} type="tags" />}
          />
          <Route path="/:slug" component={FPost} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default FRouter;
