import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getActiveProgramForTreatment } from 'app/modules/mypd/mypd.reducer';
import React, { useEffect } from 'react';
import TreatmentCard from '../components/treatment-card';
import TreatmentSummaryCard from '../components/treatment-summary-card';

const Dialysis = props => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const program = useAppSelector(state => state.mypd.program);
  useEffect(() => {
    dispatch(getActiveProgramForTreatment(account.login));
  }, [account.login]);

  return (
    <div>
      {program != null && program !== '' && <TreatmentCard props={props} program={program} />}
      {program == null || (program === '' && <TreatmentSummaryCard />)}
    </div>
  );
};

export default Dialysis;
