import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserManagementDetail from '../../administration/user-management/user-management-detail';
import UpdatePatientForm from '../add-patient/update-patient-form';
import UpdatePatientForm2 from '../add-patient/update-patient-form2';
import UserManagementDeleteDialog from '../../administration/user-management/user-management-delete-dialog';
import PatientList from './patient-list';
import { ViewPatient } from '../view-patient-details';
import DeletePatient from '../delete-patient';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:patient/edit`} component={UpdatePatientForm2} />
      <ErrorBoundaryRoute exact path={`${match.url}/:patient`} component={ViewPatient} />
      <ErrorBoundaryRoute path={match.url} component={PatientList} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:patient/delete`} component={DeletePatient} />
  </>
);

export default Routes;
