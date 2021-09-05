import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getLastSevenDaysTreatmentData } from 'app/modules/mytreatment/reducers/my-treatment.reducer';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const TreatmentSuaryChart = ({ patientId }) => {
  const dispatch = useAppDispatch();
  // alert(patientId);
  const treatmentDataList = useAppSelector(state => state.mytreatment.treatmentDataList);
  const [treatmentData, setTreatmentData] = useState(treatmentDataList);
  const [chartdata, setChartData] = useState(
    treatmentData.map(data => {
      return {
        date: data.date,
        uf: data.uf,
        fillAmount: data.fillAmount,
        drainAmount: data.drainAmount,
      };
    })
  );

  useEffect(() => {
    if (patientId != null && patientId !== undefined && patientId !== '') {
      dispatch(getLastSevenDaysTreatmentData(patientId));
    }
  }, [patientId]);

  useEffect(() => {
    setTreatmentData(treatmentDataList);
  }, [treatmentDataList]);

  useEffect(() => {
    const modified = treatmentData.map(data => {
      return {
        date: data.date,
        uf: data.uf,
        fillAmount: data.fillAmount,
        drainAmount: data.drainAmount,
      };
    });
    setChartData(modified);
  }, [treatmentData]);

  return (
    <div>
      {chartdata.length > 0 ? (
        <BarChart width={730} height={250} data={chartdata}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="uf" fill="#cc0000" />
          <Bar dataKey="fillAmount" fill="#82ca9d" />
          <Bar dataKey="drainAmount" fill="#6666ff" />
        </BarChart>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default TreatmentSuaryChart;
