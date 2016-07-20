import React, {Component} from 'react';
import Index from './containers/Index'
import NoMatch from './containers/NoMatch'
import Home from './containers/Home'
import Chat from './containers/Chat'
import { Route, IndexRoute } from 'react-router'

const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/*" component={NoMatch}/>
  </Route>
);

export default routes;
