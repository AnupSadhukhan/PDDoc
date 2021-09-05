import { Steps, Button, notification } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import React, { useEffect, useState } from 'react';

import { saveTreatmentData } from '../reducers/my-treatment.reducer';

const { Step } = Steps;

const DialysisTreatmentStart = props => {
  const account = useAppSelector(state => state.authentication.account);

  const { initialNode = 3, initialP = 100 } = props;
  const [currentNode, setCurrentNode] = useState(initialNode);
  const [percentage, setPercentage] = useState(initialP);

  const status = ['In progress', 'Completed'];
  const init = ['', '', '', ''];
  const [des, setDes] = useState(init);
  const [startTime, SetStartTime] = useState(new Date());

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (percentage > 0) {
        setPercentage(percentage - 3);
        des[3 - currentNode] = status[0];
        setDes(des);
      }
      if (percentage <= 0) {
        if (currentNode === 0) {
          clearInterval(myInterval);
        } else {
          setCurrentNode(currentNode - 1);
          des[3 - currentNode] = status[1];
          setDes(des);

          setPercentage(100);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const formatDate = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return time;
  };

  const prepareData = () => {
    const date = new Date();
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    const drainAmount = program.fillAmount + ((Math.random() * 1000) % Math.random()) * 100 + 10;
    const treatmentData = {
      date: `${year}-${month}-${day}`,
      startTime: formatDate(startTime),
      endTime: formatDate(date),
      fillAmount: program.fillAmount,
      drainAmount,
      patientPatID: account.login.toUpperCase(),
      programId: program.id,
    };
    return treatmentData;
  };

  const dispatch = useAppDispatch();

  const onClickFinish = () => {
    const treatmentData = prepareData();

    dispatch(saveTreatmentData(treatmentData));

    notification['success']({
      message: 'Treatment Completed Successfully',
      placement: 'bottomRight',
    });

    props.history.push('/');
  };
  const program = useAppSelector(state => state.mypd.program);
  let content = [`Fill Amount`, 'Dwell is progress', 'Draining out impurities', 'Completed'];
  if (program != null) {
    content = [`Fill Amount ${program.fillAmount} ml`, 'Dwell is progress', 'Draining out impurities', 'Completed'];
  }

  return (
    <div style={{ width: '600px', marginLeft: '200px' }}>
      <h3>Treatment</h3>
      <div>
        <Steps current={3 - currentNode} percent={100 - percentage}>
          <Step title="Fill" description={des[0]} />
          <Step title="Dwell" description={des[1]} />
          <Step title="Drain" description={des[2]} />
        </Steps>
      </div>

      <div className="steps-content">{content[3 - currentNode]}</div>

      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={onClickFinish} disabled={currentNode > 0}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default DialysisTreatmentStart;
