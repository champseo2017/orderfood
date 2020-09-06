import React from "react";
import "./Loading.css";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = React.memo(({ loading }) => {
  return (
    <div className='loadmain'>
      <div className='loadings '>
        <ScaleLoader
          color={"#121212"}
          loading={loading}
          margin={2}
          height={35}
          width={4}
          radius={2}
        />
      </div>
    </div>
  );
});

Loading.defaultProps = {
  loading: "",
};

export default Loading;
