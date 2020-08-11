import React from "react";

const ContentWrapper = React.memo(({ children }) => {
  return (
    <React.Fragment>
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {children}
      </div>
    </React.Fragment>
  );
});

ContentWrapper.defaultProps = {
    children: "",
};

export default ContentWrapper;
