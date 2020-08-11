import React from "react";
import ContentWrapper from "../Wrapper/ContentWrapper";
import Footer from '../footer/Footer'
const Content = React.memo(({ children }) => {
  return (
    <React.Fragment>
      <ContentWrapper>
        {/* Main Content */}
        <div id="content">{children}</div>
        <Footer/>
      </ContentWrapper>
    </React.Fragment>
  );
});

Content.defaultProps = {
  children: "",
};

export default Content;
