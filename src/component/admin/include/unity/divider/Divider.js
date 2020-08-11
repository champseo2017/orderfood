import React from "react";

const Divider = React.memo(({ classDivider }) => {
  return (
    <React.Fragment>
      <hr className={classDivider} />
    </React.Fragment>
  );
});

Divider.defaultProps = {
  classDivider: "",
};

export default Divider;