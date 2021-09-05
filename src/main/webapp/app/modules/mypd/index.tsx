import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from '../administration/user-management';
import PatientForm from '../patient/add-patient/add-patient-form';
import { MyPDPatientList } from './mypd-patient-list';
import MyPDPatientDetails from './mypd-patient-details';
import MyPDPatientProfile from './mypd-patient-profile';
import MyPDAddForm from './mypd-program-add-form';
import MyPDProgramActivate from './mypd-program-activate';
import MyPDProgramDelete from './mypd-program-delete';
import MyPDEditForm from './mypd-program-edit';
//import PatientList from './patient-list/patient-list';

//<ErrorBoundaryRoute  path={`${match.url}/mypd-details/:patientId/add`} component={MyPDPatientProfile} />

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path={`${match.url}/mypd-details/:patientId`} component={MyPDPatientProfile} />
    <ErrorBoundaryRoute exact path={`${match.url}/mypd-details/:patientId/activate/:programId`} component={MyPDProgramActivate} />
    <ErrorBoundaryRoute exact path={`${match.url}/mypd-details/:patientId/delete/:programId`} component={MyPDProgramDelete} />
    <ErrorBoundaryRoute exact path={`${match.url}/mypd-details/:patientId/edit/:programId`} component={MyPDEditForm} />
    <ErrorBoundaryRoute path={`${match.url}/mypd-details/:patientId/add`} component={MyPDAddForm} />

    <ErrorBoundaryRoute exact path={`${match.url}`} component={MyPDPatientList} />
  </div>
);

export default Routes;
