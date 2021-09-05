import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';
import { useAppDispatch } from 'app/config/store';
import { Program } from 'app/shared/model/program.model';
import React from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Col, Row } from 'reactstrap';
import { updateProgram } from './mypd.reducer';

const MyPDEditForm = props => {
  const program = props.location.state;
  const programId = props.match.params.programId;
  const patientId = props.match.params.patientId;

  const dispatch = useAppDispatch();

  const handleClose = () => {
    props.history.push('/mypd/mypd-details/' + patientId);
  };

  const onClickUpdateProgram = (values: Program) => {
    if (patientId != null && patientId !== '' && patientId !== undefined) {
      dispatch(updateProgram(values));
      notification.success({
        message: `Program updated`,
        placement: 'bottomRight',
      });
    } else {
      notification.error({
        message: `Sorry can not update program`,
        placement: 'bottomRight',
      });
    }

    handleClose();
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="6">
          <h1>update Program</h1>
        </Col>
      </Row>

      {program != null && program !== undefined && (
        <Row className="justify-content-center">
          <Col md="6">
            <ValidatedForm onSubmit={onClickUpdateProgram} defaultValues={program}>
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
      )}
    </div>
  );
};

export default MyPDEditForm;
