import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText, Form, FormGroup, Label, Input } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, getRoles, updateUser, createUser, reset } from '../../administration/user-management/user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createPatient } from '../reducers/patient-reducer';

export const PatientForm = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [bp, setBp] = useState('');
  const [pulseRate, setPulseRate] = useState('');

  const dispatch = useAppDispatch();

  const saveUser = e => {
    e.preventDefault();

    alert(`Submitting...`);
    const mobileNo = parseInt(mobile, 10);
    const patient = {
      name,
      email,
      mobile: mobileNo,
      glucoseLevel,
      bp,
      pulseRate,
    };
    dispatch(createPatient(patient));
    alert(JSON.stringify(patient, null, '  '));
    props.history.push('/patient/patient-list');
  };

  return (
    <div>
      <Form onSubmit={saveUser}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="nameField">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                id="nameField"
                placeholder="Enter Full Name"
                value={name}
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

        <FormGroup check>
          <Input type="checkbox" name="createAc" id="acField" defaultChecked disabled />
          <Label for="acField" check>
            Account will be created
          </Label>
        </FormGroup>
        <Button>Create Patient</Button>
      </Form>
    </div>
  );
};

export default PatientForm;
