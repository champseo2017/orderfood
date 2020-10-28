import Document, { Html, Head, Main, NextScript } from "next/document";
import { CheckIsEmpty } from "../component/library/FuncCheckEmpty";
import { isMobile } from 'mobile-device-detect';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    const { __NEXT_DATA__ } = this.props;
    let page = "user";
    let classPage;
    if (CheckIsEmpty(__NEXT_DATA__) && CheckIsEmpty(__NEXT_DATA__.query)) {
      const { _nextExpressData } = __NEXT_DATA__.query;
      const { pageCheck, classPages } = _nextExpressData;
      if (pageCheck === "admin") {
        page = pageCheck;
      }
      if(classPages){
        classPage = classPages
      }
    }

    return (
      <Html>
        <Head />
        <body id="page-top" className={`${classPage ? classPage:'default'} ${isMobile ? 'sidebar-toggled':''}`}>
          <Main />
          <NextScript />
          {page === "admin" && (
            <>
              {/* Bootstrap core JavaScript vendor/jquery/jquery.min.js */}
              <script src="/templateadmin/vendor/jquery/jquery.min.js" />
              {/* Bootstrap core JavaScript vendor/bootstrap/js/bootstrap.bundle.min.js */}
              <script src="/templateadmin/vendor/bootstrap/js/bootstrap.bundle.js" />

              {/* Core plugin JavaScript vendor/jquery-easing/jquery.easing.min.js*/}
              <script src="/templateadmin/vendor/jquery-easing/jquery.easing.min.js" />

              {/*Page level plugins vendor/chart.js/Chart.min.js*/}
              <script src="/templateadmin/vendor/chart.js/Chart.min.js" />
               
             

            </>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
