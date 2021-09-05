import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { defaultProgramValue, Program } from 'app/shared/model/program.model';
import React, { useEffect } from 'react';
import { ValidatedForm, ValidatedField, isEmail } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { getPatient, reset, updatePatient } from '../patient/reducers/patient-reducer';
import { createProgram } from './mypd.reducer';

const MyPDAddForm = props => {
  const patientId = props.match.params.patientId;

  const dispatch = useAppDispatch();

  const handleClose = () => {
    props.history.push('/mypd/mypd-details/' + patientId);
  };

  const saveUser = (values: Program) => {
    //
    if (patientId != null && patientId !== '' && patientId !== undefined) {
      values.patientId = patientId;
      dispatch(createProgram(values));
    } else {
      alert('can not create program');
    }
    alert(JSON.stringify(values, null, '  '));
    handleClose();
  };

  const program = defaultProgramValue;

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="6">
          <h1>Add Program</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="6">
          <ValidatedForm onSubmit={saveUser} defaultValues={program}>
            <ValidatedField
              type="text"
              name="name"
              label="Program Name"
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
              name="fillAmount"
              label="Fill Amount (ml)"
              placeholder={'e.g. 1000 ml'}
              type="number"
              step="any"
              validate={{
                required: {
                  value: true,
                  message: 'Your Fill AMount is required.',
                },
              }}
            />
            <ValidatedField type="checkbox" name="isActive" />
            <label>Make it active</label>
            <br></br>
            <Button onClick={handleClose} color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">Back</span>
            </Button>
            &nbsp;
            <Button color="primary" type="submit">
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default MyPDAddForm;
