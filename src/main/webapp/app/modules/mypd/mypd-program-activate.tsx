import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { getProgramsForPatient, updateProgram } from './mypd.reducer';

const MyPDProgramActivate = props => {
  const { match, state } = props;
  const program = props.location.state;
  const patientId = props.match.params.patientId;

  const dispatch = useAppDispatch();
  notification.info({
    message: `Activating program`,
    placement: 'bottomRight',
  });
  setTimeout(() => {
    if (program != null && program !== undefined) {
      const newProgram = { ...program };
      newProgram.isActive = true;
      dispatch(updateProgram(newProgram));

      notification.success({
        message: `Program Activated`,
        placement: 'bottomRight',
      });
      props.history.push(`/mypd/mypd-details/${patientId}`);
    }
  }, 1000);

  return <div>Activating...</div>;
};

export default MyPDProgramActivate;
