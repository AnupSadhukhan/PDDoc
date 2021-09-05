import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Col, FormText, Form, FormGroup, Label, Input } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import patientReducer, { updatePatient, getPatient, reset } from '../reducers/patient-reducer';

export const UpdatePatientForm = props => {
  const [id, setId] = useState('');
  const [patID, setPatID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [bp, setBp] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  //alert(JSON.stringify(props, null, '  '));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatient(props.match.params.patient));

    return () => {
      dispatch(reset());
    };
  }, [props.match.params.patient]);

  // alert(JSON.stringify(patientUser, null, '  '));

  const handleClose = () => {
    props.history.push('/patient/patient-list');
  };

  //alert(JSON.stringify(patID, null, '  '));

  const updateUser = e => {
    e.preventDefault();

    alert(`Submitting...`);
    const mobileNo = parseInt(mobile, 10);
    const patient = {
      id,
      patID,
      name,
      email,
      mobile: mobileNo,
      glucoseLevel,
      bp,
      pulseRate,
    };
    dispatch(updatePatient(patient));
    alert(JSON.stringify(patient, null, '  '));
    handleClose();
  };

  const patientUser = useAppSelector(state => state.patientManagement.patient);
  //   if(patientUser.name!=='' ){
  //       setName(patientUser.name);
  //   }

  return (
    <div>
      <Form onSubmit={updateUser}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="nameField">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                id="nameField"
                placeholder="Enter Full Name"
                value={patientUser.name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="emailField">Email</Label>
              <Input
                type="email"
                name="email"
                id="emailField"
                placeholder="test@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="mobileField">Mobile No</Label>
              <Input
                type="text"
                name="mobile"
                id="mobileField"
                placeholder="Enter Mobile No."
                value={mobile}
                onChange={e => setMobile(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="glucoseField">Glucose Level</Label>
              <Input
                type="text"
                name="glucose"
                id="glucoseField"
                placeholder="e.g. 104"
                value={glucoseLevel}
                onChange={e => setGlucoseLevel(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="bpField">Blood Pressure</Label>
              <Input type="text" name="bp" id="bpField" placeholder="e.g. 120" value={bp} onChange={e => setBp(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="pulseField">Pulse Rate</Label>
              <Input
                type="text"
                name="pulse"
                id="pulseField"
                placeholder="e.g. 74"
                value={pulseRate}
                onChange={e => setPulseRate(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit">Create Patient</Button>
      </Form>
    </div>
  );
};

export default UpdatePatientForm;
