import React from "react";

const SidebarHeading = React.memo(({ children, classHeading }) => {
  return (
    <React.Fragment>
      <div className={classHeading}>{children}</div>
    </React.Fragment>
  );
});

SidebarHeading.defaultProps = {
  classHeading: "",
  children:''
};

export default SidebarHeading;
