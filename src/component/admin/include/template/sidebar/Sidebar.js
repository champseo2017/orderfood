import React from "react";
import { isMobile } from 'mobile-device-detect';

const Sidebar = React.memo(({children}) => {
  return (
    <React.Fragment>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isMobile ? 'toggled':''}`}
        id="accordionSidebar"
      >
       {children}
      </ul>
      {/* End of Sidebar */}
    </React.Fragment>
  );
});

Sidebar.defaultProps = {
  children: "",
};

export default Sidebar;