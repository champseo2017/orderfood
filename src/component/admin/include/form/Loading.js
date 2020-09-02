import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = React.memo(({ loading, color,size }) => {
  return (
    <React.Fragment>
      <MoonLoader
        color={color}
        loading={loading}
        margin={2}
        height={35}
        width={4}
        radius={2}
        size={size}
      />
    </React.Fragment>
  );
});

Loading.defaultProps = {
  loading: "",
  color:'',
  size:''
};

export default Loading;