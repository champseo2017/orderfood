import React from "react";

const Wrapper = React.memo(({ children }) => {
  return (
    <React.Fragment>
      {/* Page Wrapper */}
      <div id="wrapper">{children}</div>
    </React.Fragment>
  );
});

export default Wrapper;
