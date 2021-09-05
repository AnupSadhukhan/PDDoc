import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import patientReducer, { updatePatient, getPatient, reset } from '../reducers/patient-reducer';

export const UpdatePatientForm2 = (props: RouteComponentProps<{ patient: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatient(props.match.params.patient));
    return () => {
      dispatch(reset());
    };
  }, [props.match.params.patient]);

  const handleClose = () => {
    props.history.push('/patient/patient-list');
  };

  const saveUser = values => {
    dispatch(updatePatient(values));
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.patientManagement.patient);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Edit Patient</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm onSubmit={saveUser} defaultValues={user}>
            {user !== null && user.id ? (
              <ValidatedField type="text" name="patID" required readOnly label="Patient ID" validate={{ required: true }} />
            ) : null}
            <ValidatedField
              type="text"
              name="name"
              label="Name"
              validate={{
                required: {
                  value: true,
                  message: 'Name is required.',
                },
                minLength: {
                  value: 1,
                  message: 'Your username is required to be at least 1 character.',
                },
                maxLength: {
                  value: 50,
                  message: 'Your username cannot be longer than 50 characters.',
                },
              }}
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder={'Your email'}
              type="email"
              validate={{
                required: {
                  value: true,
                  message: 'Your email is required.',
                },
                minLength: {
                  value: 5,
                  message: 'Your email is required to be at least 5 characters.',
                },
                maxLength: {
                  value: 254,
                  message: 'Your email cannot be longer than 50 characters.',
                },
                validate: v => isEmail(v) || 'Your email is invalid.',
              }}
            />
            <ValidatedField
              type="text"
              name="mobile"
              label="Mobile No"
              validate={{
                required: {
                  value: true,
                  message: 'Mobile no Level is required',
                },
                minLength: {
                  value: 10,
                  message: 'Your mobile no is required to be at least 10 digits.',
                },
                maxLength: {
                  value: 10,
                  message: 'Your mobile no cannot be longer than 10 digits.',
                },
              }}
            />
            <ValidatedField
              type="text"
              name="glucoseLevel"
              label="Glucose Level"
              validate={{
                required: {
                  value: true,
                  message: 'Glucose Level is required',
                },
              }}
            />
            <ValidatedField
              type="text"
              name="bp"
              label="Blood Pressure"
              validate={{
                required: {
                  value: true,
                  message: 'Blood Pressure is required',
                },
              }}
            />
            <ValidatedField
              type="text"
              name="pulseRate"
              label="Pulse Rate"
              validate={{
                required: {
                  value: true,
                  message: 'Pulse Rate is required',
                },
              }}
            />
            <Button tag={Link} to="/patient/patient-list" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">Back</span>
            </Button>
            &nbsp;
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default UpdatePatientForm2;
