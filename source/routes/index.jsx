import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import FHome from '../containers/home';
import FList from '../containers/list';
import FPost from '../containers/post';
import FError from '../containers/error';

const FRouter = () => {
  // forceRefresh is no longer standard in v6 Browser Router same way, 
  // but let's stick to standard usage. Modern browsers support history.
  return (
    <BrowserRouter>
      <div className="feather-wrap">
        <Routes>
          <Route path="/" element={<FHome />} />
          <Route path="/archive" element={<FList bla="blue" />} />
          <Route
            path="/tag/:slug"
            element={<FList type="tags" />}
          />
          <Route
            path="/search/:slug"
            element={<FList type="search" />}
          />
          <Route path="/error" element={<FError />} />
          <Route path="/:slug" element={<FPost />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default FRouter;
