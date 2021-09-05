import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import PatientForm from './modules/patient/add-patient/add-patient-form';

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});
const Patient = Loadable({
  loader: () => import(/* webpackChunkName: "patient" */ 'app/modules/patient'),
  loading: () => <div>loading ...</div>,
});
const Report = Loadable({
  loader: () => import(/* webpackChunkName: "patient" */ 'app/modules/report'),
  loading: () => <div>loading ...</div>,
});
const MyPD = Loadable({
  loader: () => import(/* webpackChunkName: "patient" */ 'app/modules/mypd'),
  loading: () => <div>loading ...</div>,
});
const MyTreatment = Loadable({
  loader: () => import(/* webpackChunkName: "patient" */ 'app/modules/mytreatment'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => {
  return (
    <div className="view-routes">
      <Switch>
        <ErrorBoundaryRoute path="/login" component={Login} />
        <ErrorBoundaryRoute path="/logout" component={Logout} />
        <ErrorBoundaryRoute path="/account/register" component={Register} />
        <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
        <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
        <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
        <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
        <PrivateRoute path="/patient" component={Patient} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
        <PrivateRoute path="/report" component={Report} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
        <PrivateRoute path="/mypd" component={MyPD} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
        <PrivateRoute path="/my-treatment" component={MyTreatment} hasAnyAuthorities={[AUTHORITIES.USER]} />
        <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
        <ErrorBoundaryRoute path="/" exact component={Home} />
        <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
        <ErrorBoundaryRoute component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
