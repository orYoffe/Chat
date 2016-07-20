import React, {Component} from 'react';
import Index from './components/Index'
import NoMatch from './components/NoMatch'
import Home from './components/Home'
import Chat from './components/Chat'
import { Route, IndexRoute } from 'react-router'

const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/*" component={NoMatch}/>
  </Route>
);

export default routes;
