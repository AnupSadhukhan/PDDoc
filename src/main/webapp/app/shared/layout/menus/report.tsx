import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

const PatientReportMenuItems = (
  <>
    <MenuItem id="patient-list-item" icon="list" to="/report/patient-list-report" data-cy="patientList">
      Patient List
    </MenuItem>
  </>
);

export const PatientReportMenu = () => (
  <NavDropdown icon="chart-line" name="Report" id="patient-menu" data-cy="patientReportMenu">
    {PatientReportMenuItems}
  </NavDropdown>
);

export default PatientReportMenu;
