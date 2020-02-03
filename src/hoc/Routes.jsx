import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './../containers/Home/Home';
import Members from '../containers/Members/Members';
import Lists from '../containers/Lists/Lists';
import MemberEdit from './../containers/Members/MemberEdit/MemberEdit';
import MemberDetail from '../containers/Members/MemberDetail/MemberDetail';


const Routes = ({ isAuthenticated }) => {
  let appRoutes = (
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/' component={Home} />
      <Redirect from='/' exact to='home' />
    </Switch>
  );

  if (isAuthenticated) {
    appRoutes = (
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/members/:id' component={MemberDetail} />
        <Route path='/members' component={Members} />
        <Route path='/member/edit' component={MemberEdit} />
        <Route path='/lists' component={Lists} />
        <Route path='/' component={Home} />
        <Redirect from='/' exact to='home' />
      </Switch>
    );
  }

  return appRoutes;
};

export default Routes;
