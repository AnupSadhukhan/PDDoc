import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

const MyTreatmentMenuItems = (
  <>
    <MenuItem id="patient-list-item" icon="capsules" to="/my-treatment" data-cy="myTratmentMenuList">
      Dialysis
    </MenuItem>
    <MenuItem id="patient-list-item" icon="heartbeat" to="/my-treatment/summary" data-cy="myTratmentMenuList">
      Treatment Summary
    </MenuItem>
  </>
);

export const MyTreatmentMenu = () => (
  <NavDropdown icon="clinic-medical" name="MyTreatment" id="mypd-menu" data-cy="myTreatmentMenu">
    {MyTreatmentMenuItems}
  </NavDropdown>
);

export default MyTreatmentMenu;
