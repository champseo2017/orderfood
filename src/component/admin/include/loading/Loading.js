import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import stylesLoading from "./Loading.module.css";

const Loading = React.memo(({ loading }) => {
  return (
    <div className={stylesLoading.loadmain}>
    <div className={stylesLoading.loadings}>
      <PropagateLoader
        size={30}
        color={"#123abc"}
        loading={loading}
      />
    </div>
    </div>
  );
});

Loading.defaultProps = {
  loading: "",
};

export default Loading;
