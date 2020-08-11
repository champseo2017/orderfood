import React from "react";

const TopBar = React.memo(({ children }) => {
  return (
    <React.Fragment>
        {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {children}
      </nav>
      
    </React.Fragment>
  );
});

TopBar.defaultProps = {
    children: "",
};

export default TopBar;