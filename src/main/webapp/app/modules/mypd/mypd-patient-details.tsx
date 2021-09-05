import { Descriptions } from 'antd';
import React from 'react';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;
const MyPDPatientDetails = props => {
  const patient = props.data;

  return (
    <div>
      <Descriptions title="Patient Info">
        <Descriptions.Item label="Patient ID">
          <Text strong>{patient.patID}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          <Text strong>{patient.name}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <Text strong>{patient.email}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Mobile">
          <Text strong>{patient.mobile}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Glucose Level">
          <Text strong>{patient.glucoseLevel} mg/dL</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Blood Pressure">
          <Text strong>{patient.bp} mmHg</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Pulse Rate">
          <Text strong>{patient.pulseRate}</Text>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default MyPDPatientDetails;
