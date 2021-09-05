import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { getProgramsForPatient, updateProgram } from './mypd.reducer';

const MyPDProgramActivate = props => {
  const { match, state } = props;
  const program = props.location.state;
  const patientId = props.match.params.patientId;
  alert('1request to active ' + match.params.programId);
  alert(JSON.stringify(match, null, ' '));
  alert(JSON.stringify(program, null, ' '));
  const dispatch = useAppDispatch();
  setTimeout(() => {
    if (program != null && program !== undefined) {
      const newProgram = { ...program };
      newProgram.isActive = true;
      dispatch(updateProgram(newProgram));
      alert('updating...');
      props.history.push(`/mypd/mypd-details/${patientId}`);
    }
  }, 1000);

  return <div>Activating...</div>;
};

export default MyPDProgramActivate;
