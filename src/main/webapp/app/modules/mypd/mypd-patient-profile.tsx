import { useAppDispatch, useAppSelector } from 'app/config/store';
import TreatmentSuaryChart from 'app/shared/layout/chart/treatment-summary-chart';
import React, { useEffect } from 'react';
import TreatmentSummaryList from '../mytreatment/components/treatment-summary-list';
import { getPatient, reset } from '../patient/reducers/patient-reducer';
import MyPDPatientDetails from './mypd-patient-details';
import MyPDProgram from './mypd-program';

const MyPDPatientProfile = props => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatient(props.match.params.patientId));

    return () => {
      dispatch(reset());
    };
  }, [props.match.params.patient]);

  const patient = useAppSelector(state => state.patientManagement.patient);
  return patient != null ? (
    <div>
      <MyPDPatientDetails data={patient} props={props} />
      <hr />
      <h4>Device Settings</h4>
      <MyPDProgram data={patient} props={props} />
      <hr />
      <h4>Treatment summary of Last 7 days</h4>
      <TreatmentSummaryList patientId={patient.patID} />
      <hr />
    </div>
  ) : (
    <span>Loading...</span>
  );
};

export default MyPDPatientProfile;
