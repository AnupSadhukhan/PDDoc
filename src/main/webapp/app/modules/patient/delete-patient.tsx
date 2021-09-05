import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPatient } from './reducers/patient-reducer';

export const DeletePatient = (props: RouteComponentProps<{ patient: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatient(props.match.params.patient));
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/patient/patient-list');
  };

  const user = useAppSelector(state => state.userManagement.user);

  const confirmDelete = event => {
    //dispatch(deleteUser(user.login));
    alert('user deleted');
    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody>Are you sure you want to delete this User?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeletePatient;
