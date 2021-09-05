import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { deleteProgram, getProgramsForPatient, updateProgram } from './mypd.reducer';

const MyPDProgramDelete = props => {
  const { match, state } = props;
  const program = props.location.state;
  const programId = props.match.params.programId;
  const patientId = props.match.params.patientId;

  const dispatch = useAppDispatch();

  notification.info({
    message: `Deleting program`,
    placement: 'bottomRight',
  });

  setTimeout(() => {
    if (programId != null && programId !== undefined && programId !== '') {
      dispatch(deleteProgram(programId));
      dispatch(getProgramsForPatient(patientId));

      notification.success({
        message: `Program deleted successfully`,
        placement: 'bottomRight',
      });
      props.history.push(`/mypd/mypd-details/${patientId}`);
    }
  }, 1000);

  return <div>Deleting...</div>;
};

export default MyPDProgramDelete;
