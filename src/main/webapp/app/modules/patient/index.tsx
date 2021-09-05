import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from '../administration/user-management';
import PatientForm from './add-patient/add-patient-form';
//import PatientList from './patient-list/patient-list';
import PatientList from './patient-list';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/add-patient`} component={PatientForm} />
    <ErrorBoundaryRoute path={`${match.url}/patient-list`} component={PatientList} />
  </div>
);

export default Routes;
