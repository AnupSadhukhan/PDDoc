import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getUsersAsAdmin, updateUser } from '../../administration/user-management/user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPatients } from '../reducers/patient-reducer';

export const PatientList = (props: RouteComponentProps<any>) => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [patientList, setPatientList] = useState(patients);
  useEffect(() => {
    if (searchTerm !== '' && patients.length > 0) {
      const filteredPatientList = patients.filter(patient => {
        return Object.values(patient).join().toLowerCase().includes(searchTerm.toLowerCase());
      });
      setPatientList(filteredPatientList);
    } else {
      setPatientList(patients);
    }
  }, [searchTerm, patients]);

  /*
      <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
        </div>
  */
  return (
    <div>
      <h3 id="user-management-page-heading" data-cy="userManagementPageHeading">
        Patients
      </h3>
      <div className="d-flex justify-content-end ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search"
            className="prompt"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              ID
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('name')}>
              Name
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('email')}>
              Email
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientList.map((patient, i) => (
            <tr id={patient.id} key={patient.id}>
              <td>{patient.patID}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>

              <td className="text-center">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${patient.id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${patient.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${patient.id}/delete`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={patients && patients.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PatientList;
