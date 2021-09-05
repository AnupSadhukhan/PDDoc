import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const TreatmentSummaryCard = () => {
  return (
    <div>
      <Card style={{ width: '500px', left: '50px' }}>
        <CardImg top width="100%" src="content/images/kidney_treatment-2.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Treatment Summary</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>

          <CardText> Your treatment is completed for today.</CardText>

          <Button color="primary" tag={Link} to={`/`}>
            Back to Home
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TreatmentSummaryCard;
