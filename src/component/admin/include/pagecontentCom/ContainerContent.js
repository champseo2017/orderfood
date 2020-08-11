import React from "react";
import PageHeading from "./PageHeading";
import ContentRow from "./ContentRow";

const ContainerContent = React.memo(({ children }) => {
  return (
    <div className="container-fluid">
      <PageHeading />
      <ContentRow />
    </div>
  );
});
ContainerContent.defaultProps = {
  children: "",
};
export default ContainerContent;
