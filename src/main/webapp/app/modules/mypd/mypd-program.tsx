import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Space } from 'antd';
import { Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getProgramsForPatient } from './mypd.reducer';
import ProgramRow from './program-row-component';

const { Meta } = Card;

const onClickAdd = e => {
  e.preventDefault();
  //toggle();
};

const MyPDProgram = props => {
  const patient = props.data;
  const localProps = props.props;
  const { match } = localProps;
  const patientId = patient.id;
  const dispatch = useAppDispatch();
  const programs = useAppSelector(state => state.mypd.programs);
  const getPrograms = () => {
    if (patientId !== null && patientId !== undefined && patientId !== '') dispatch(getProgramsForPatient(patientId));
  };
  useEffect(() => {
    getPrograms();
  }, [patientId]);

  const dummyPrograms = [];
  for (let i = 0; i < 4 - programs.length; i++) {
    dummyPrograms[i] = {
      id: 'dummy' + (i + 1),
      name: '---',
      fillAmount: '---',
    };
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fill Amount (ml)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, i) => (
            <tr key={program.id}>
              <td>{program.name}</td>
              <td>{program.fillAmount}</td>
              <td>
                {program != null && program !== undefined && (
                  <Link
                    to={{
                      pathname: `${match.url}/edit/${program.id}`,
                      state: program,
                    }}
                  >
                    Edit
                  </Link>
                )}

                {program != null && program !== undefined && (
                  <span>
                    {' '}
                    |{' '}
                    <Link
                      to={{
                        pathname: `${match.url}/delete/${program.id}`,
                        state: program,
                      }}
                    >
                      Delete
                    </Link>
                  </span>
                )}

                {program.isActive && <span> | Activated</span>}
                {!program.isActive && (
                  <span>
                    {' '}
                    |{' '}
                    <Link
                      to={{
                        pathname: `${match.url}/activate/${program.id}`,
                        state: program,
                      }}
                    >
                      Activate
                    </Link>
                  </span>
                )}
              </td>
            </tr>
          ))}
          {dummyPrograms.map(program => (
            <tr key={program.id}>
              <td>{program.name}</td>
              <td>{program.fillAmount}</td>
              <td>
                <Link to={`${match.url}/add`}>add</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyPDProgram;
