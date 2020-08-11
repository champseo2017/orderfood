import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    const { __NEXT_DATA__ } = this.props;
    const { pageProps } = __NEXT_DATA__.props;
    const { pageCheck } = pageProps;

    let page = "user";
    if (pageCheck === "admin") {
      page = pageCheck;
    }

    return (
      <Html>
        <Head />
        <body id="page-top">
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
