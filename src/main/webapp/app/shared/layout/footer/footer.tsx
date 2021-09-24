import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>©Copyright 2021 PDDoc. All rights reserve</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
