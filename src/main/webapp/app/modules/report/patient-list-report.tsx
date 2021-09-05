import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPatients } from '../patient/reducers/patient-reducer';
import { identity } from 'lodash';
import { generateReportForAllPatient, generateReportForSelectedPatient } from './report.reducer';
import axios from 'axios';

const PatientListReport = props => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getPatientUsers = () => {
    dispatch(getPatients());
  };

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

  const { match } = props;
  const patients = useAppSelector(state => state.patientManagement.patients);
  const totalItems = useAppSelector(state => state.patientManagement.totalItems);
  const loading = useAppSelector(state => state.patientManagement.loading);

  const modifiedPatient = patients.map(patient => {
    return { ...patient, select: false };
  });

  const [allChecked, setAllChecked] = useState(false);
  const [allPatients, setPatients] = useState(modifiedPatient);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    getPatientUsers();
  }, []);

  const handleReset = () => {
    setPatients(
      allPatients.map(patient => {
        return { ...patient, select: false };
      })
    );
    setAllChecked(false);
    setIds([]);
  };

  const api = 'http://localhost:8081/reports';
  const onClickHandler = e => {
    e.preventDefault();

    if (allChecked) {
      //dispatch(generateReportForAllPatient());

      const link = document.createElement('a');
      link.href = api + '/all';
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } else {
      //dispatch(generateReportForSelectedPatient(ids))
      const link = document.createElement('a');
      const url = api + '?id=' + ids;
      link.href = url;
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }
    handleReset();
  };

  return (
    <div>
      <div>
        <Button color="primary" className="btn float-right" onClick={onClickHandler} disabled={!allChecked && ids.length <= 0}>
          Generate Report
        </Button>
      </div>
      <br />
      <></>
      <Table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={e => {
                  const checked = e.target.checked;
                  setAllChecked(checked);

                  if (checked) {
                    setPatients(
                      allPatients.map(patient => {
                        return { ...patient, select: true };
                      })
                    );
                  } else {
                    setPatients(
                      allPatients.map(patient => {
                        return { ...patient, select: false };
                      })
                    );
                    setIds([]);
                  }
                }}
              ></input>
            </th>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {allPatients.map((patient, i) => (
            <tr key={patient.id}>
              <td>
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={patient.select}
                  onChange={e => {
                    const checked = e.target.checked;
                    patient.select = checked;
                    setPatients(
                      allPatients.map(p => {
                        if (p.id === patient.id) {
                          p.select = checked;
                          if (checked) {
                            ids.push(p.id);
                            setIds(ids);
                          } else {
                            const indx = ids.indexOf(p.id);
                            if (indx > -1) {
                              ids.splice(indx, 1);
                            }
                            setIds(ids);
                          }
                        }

                        return p;
                      })
                    );
                  }}
                />
              </td>
              <td>{patient.patID}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default PatientListReport;
