import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getUsersAsAdmin, updateUser } from '../administration/user-management/user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPatients } from '../patient/reducers/patient-reducer';
import RowComponent from './RowComponent';

export const MyPDPatientList = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getPatientUsers = () => {
    dispatch(getPatients());
  };

  useEffect(() => {
    getPatientUsers();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getPatientUsers();
  };

  const toggleActive = user => () =>
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      })
    );

  const { match } = props;

  const patients = useAppSelector(state => state.patientManagement.patients);
  const totalItems = useAppSelector(state => state.patientManagement.totalItems);
  const loading = useAppSelector(state => state.patientManagement.loading);

  const onRowClick = (data, e) => {
    props.history.push({
      pathname: '/mypd/mypd-details/' + data.id,

      state: data, // your data array of objects
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Glocose Level</th>
          <th>Blood Pressure</th>
          <th>Pulse Rate</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, i) => (
          <RowComponent key={patient.id} patient={patient} onClick={onRowClick} />
        ))}
      </tbody>
    </Table>
  );
};

export default MyPDPatientList;
