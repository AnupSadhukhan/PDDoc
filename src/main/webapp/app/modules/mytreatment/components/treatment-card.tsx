import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const TreatmentCard = ({ props, program }) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [disable, setDisable] = useState(false);

  return (
    <div>
      <Card style={{ width: '500px', left: '50px' }}>
        <CardImg top width="100%" src="content/images/kidney_treatment-1.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">PD Dialysis</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>

          <CardText> Your treatment will be in cycle consisting 3 phases</CardText>
          <div>
            <ul>
              <li>Fill</li>
              <li>Dwell</li>
              <li>Drain</li>
            </ul>
            Please connect solution line and click on start, we will take care of your treatment. To know about the process{' '}
            <a href="https://renalcare.baxter.com/therapies/peritoneal-dialysis" rel="noreferrer" target="_blank">
              click me
            </a>
            <br />
          </div>
          <hr />
          <div>
            <h5>Your Treatment Details</h5>
            {program != null && (
              <ul style={{ listStyleType: 'none' }}>
                <li>Program name - {program.name}</li>
                <li>Solution - {program.fillAmount} ml</li>
                <li>Estimated Time Required - 8 hours</li>
              </ul>
            )}
          </div>
          <div>
            <></>
            <div style={{ marginTop: '10px' }}>
              <input type="checkbox" checked={checkboxValue} onChange={e => setCheckboxValue(!checkboxValue)} disabled={disable} />
              <span> </span> I give consent to proceed and start treatment
            </div>
          </div>

          <Button color="primary" tag={Link} to={`${props.match.url}/start`} disabled={!checkboxValue} onClick={e => setDisable(true)}>
            Start
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TreatmentCard;
