import React from 'react';

const RowComponent = props => {
  const { patient, onClick } = props;

  function handleClick() {
    onClick(patient);
  }

  return (
    <tr onClick={handleClick} className="mypdrow">
      <td>{patient.patID}</td>
      <td>{patient.name}</td>
      <td>{patient.email}</td>
      <td>{patient.mobile}</td>
      <td>{patient.glucoseLevel}</td>
      <td>{patient.bp}</td>
      <td>{patient.pulseRate}</td>
    </tr>
  );
};

export default RowComponent;
