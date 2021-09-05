import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

const PatientMenuItems = (
  <>
    <MenuItem id="patient-add-item" icon="user-plus" to="/patient/add-patient" data-cy="addPatient">
      Add Patient
    </MenuItem>
    <MenuItem id="patient-list-item" icon="list" to="/patient/patient-list" data-cy="patientList">
      Patient List
    </MenuItem>
  </>
);

export const PatientMenu = () => (
  <NavDropdown icon="user" name="Patient" id="patient-menu" data-cy="patientMenu">
    {PatientMenuItems}
  </NavDropdown>
);

export default PatientMenu;
