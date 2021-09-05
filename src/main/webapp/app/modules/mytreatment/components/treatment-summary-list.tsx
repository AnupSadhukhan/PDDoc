import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { getLastSevenDaysTreatmentData } from '../reducers/my-treatment.reducer';

const TreatmentSummaryList = ({ patientId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (patientId != null && patientId !== undefined && patientId !== '') dispatch(getLastSevenDaysTreatmentData(patientId));
  }, [patientId]);

  const treatmentDataList = useAppSelector(state => state.mytreatment.treatmentDataList);

  const onClickGenerateReport = () => {
    const api = 'http://localhost:8081/reports/treatment-summary/' + patientId;
    const link = document.createElement('a');
    link.href = api;
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };

  return (
    <div>
      <div>
        <Button color="primary" className="btn float-right" onClick={onClickGenerateReport} disabled={treatmentDataList.length <= 0}>
          Generate Report
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Fill Amount(ml)</th>
            <th>Drain Amount(ml)</th>
            <th>Ultra Filtration (ml)</th>
          </tr>
        </thead>
        <tbody>
          {treatmentDataList.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.date}</td>
                <td>{data.startTime}</td>
                <td>{data.endTime}</td>
                <td>{data.fillAmount}</td>
                <td>{data.drainAmount}</td>
                <td>{data.uf}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TreatmentSummaryList;
