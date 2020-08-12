import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import stylesLoading from "./Loading.module.css";

const Loading = React.memo(({ loading }) => {
  return (
    <div className={stylesLoading.loadmain}>
      <div className={stylesLoading.loadings}>
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
