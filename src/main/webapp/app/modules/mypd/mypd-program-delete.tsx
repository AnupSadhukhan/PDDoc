import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { deleteProgram, getProgramsForPatient, updateProgram } from './mypd.reducer';

const MyPDProgramDelete = props => {
  const { match, state } = props;
  const program = props.location.state;
  const programId = props.match.params.programId;
  const patientId = props.match.params.patientId;
  alert('1request to active ' + match.params.programId);
  alert(JSON.stringify(match, null, ' '));
  alert(JSON.stringify(program, null, ' '));
  const dispatch = useAppDispatch();
  setTimeout(() => {
    if (programId != null && programId !== undefined && programId !== '') {
      dispatch(deleteProgram(programId));
      dispatch(getProgramsForPatient(patientId));
      alert('updating...');
    }
    props.history.push(`/mypd/mypd-details/${patientId}`);
  }, 1000);

  return <div>Deleting...</div>;
};

export default MyPDProgramDelete;
