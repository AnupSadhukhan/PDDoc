import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

const MyPDMenuItems = (
  <>
    <MenuItem id="patient-list-item" icon="first-aid" to="/mypd" data-cy="mypdMenuList">
      Administrate Treatment
    </MenuItem>
  </>
);

export const MyPDMenu = () => (
  <NavDropdown icon="clinic-medical" name="MyPD" id="mypd-menu" data-cy="mypdMenu">
    {MyPDMenuItems}
  </NavDropdown>
);

export default MyPDMenu;
