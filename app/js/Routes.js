'use strict';

import React                       from 'react/addons';
import {Router, Route, IndexRoute} from 'react-router';
import CreateBrowserHistory        from 'react-router/node_modules/history/lib/createBrowserHistory';

import App                         from './App';
import HomePage                    from './pages/HomePage';
import NotFoundPage                from './pages/NotFoundPage';

export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/" component={App}>

      <IndexRoute component={HomePage} />

      <Route path="/" component={HomePage} />
      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);