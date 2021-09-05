import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  //alert(JSON.stringify(account,null," "));

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>Welcome to Baxter Sharesource</h2>
        <p className="lead">We at Baxter provide PD solutions</p>
        {account && account.login && (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        )}
        {
          <div>
            <p>
              Baxter touches the lives of millions of people around the world every day. Our products and therapies can be found throughout
              hospitals and clinics – from the ER to the OR, from the pharmacy to the ICU – as well as advancing patients’ care in their
              homes.
            </p>
          </div>
        }
        {account && account.login ? null : (
          <div>
            <Alert color="warning">
              You do not have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
