import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Dialysis from './dialysis/dialysis';
import DialysisTreatmentStart from './dialysis/dialysis-treatment-start';
import TreatmentSummaryCard from './components/treatment-summary-card';
import TreatmentSummaryList from './components/treatment-summary-list';

//<ErrorBoundaryRoute  path={`${match.url}/mypd-details/:patientId/add`} component={MyPDPatientProfile} />

const Routes = props => {
  const { match } = props;

  return (
    <div>
      <ErrorBoundaryRoute exact path={`${match.url}`} component={Dialysis} />
      <ErrorBoundaryRoute exact path={`${match.url}/start`} component={DialysisTreatmentStart} />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/summary`}
        component={() => <TreatmentSummaryList patientId={props.user} {...props} />}
      />
    </div>
  );
};

export default Routes;
