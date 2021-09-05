import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

//import PatientList from './patient-list/patient-list';
import PatientList from '../patient/patient-list/patient-list';
import PatientListReport from './patient-list-report';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/patient-list-report`} component={PatientListReport} />
  </div>
);

export default Routes;
