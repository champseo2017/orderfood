import React from "react";

const SidebarToggle = React.memo(() => {
  return (
    <button
      id="sidebarToggleTop"
      className="btn btn-link d-md-none rounded-circle mr-3"
    >
      <i className="fa fa-bars"></i>
    </button>
  );
});

export default SidebarToggle;
