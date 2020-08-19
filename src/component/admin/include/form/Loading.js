import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = React.memo(({ loading }) => {
  return (
    <React.Fragment>
      <MoonLoader
        color={"#ffffff"}
        loading={loading}
        margin={2}
        height={35}
        width={4}
        radius={2}
        size={16}
      />
    </React.Fragment>
  );
});

Loading.defaultProps = {
  loading: "",
};

export default Loading;
