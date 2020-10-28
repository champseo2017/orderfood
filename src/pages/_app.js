import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import configureStore from "./store";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { CheckIsEmpty } from "./component/library/FuncCheckEmpty";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc"); // dependent on utc plugin
const timezone = require("dayjs/plugin/timezone");
dayjs.locale("th");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bangkok");

const { store, persistor } = configureStore();

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error);
  }
  render() {
    const { Component, pageProps } = this.props;

    let page = "user";

    if (
      CheckIsEmpty(this.props.router) &&
      CheckIsEmpty(this.props.router.query)
    ) {
      const { pageCheck } = this.props.router.query._nextExpressData;
      if (pageCheck === "admin") {
        page = pageCheck;
      }
    }

    const renderPagesStyle = (page) => {
      if (page === "admin") {
        return (
          <React.Fragment>
            <link
              href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
              rel="stylesheet"
            />

            <link
              data-require="datatables@*"
              data-semver="1.10.12"
              rel="stylesheet"
              href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css"
            />

            {/* Custom fonts for this template vendor/fontawesome-free/css/all.min.css */}
            <link
              href="/templateadmin/vendor/fontawesome-free/css/all.min.css"
              rel="stylesheet"
              type="text/css"
            />
            {/* Custom styles for this template */}
            <link
              href="/templateadmin/css/sb-admin-2.min.css"
              rel="stylesheet"
            />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <link
              href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
              integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
              crossOrigin="anonymous"
            />
          </React.Fragment>
        );
      }
    };

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1.0,initial-scale=1.0, user-scalable=no,shrink-to-fit=no"
            charSet="utf-8"
          />

          {/* pwa */}
          <link rel="manifest" href="/manifest.json" />
          {/* ios support */}
          <link rel="apple-touch-icon" href="/image/pwa/72.png" />
          <link rel="apple-touch-icon" href="/image/pwa/96.png" />
          <link rel="apple-touch-icon" href="/image/pwa/128.png" />
          <link rel="apple-touch-icon" href="/image/pwa/144.png" />
          <link rel="apple-touch-icon" href="/image/pwa/152.png" />
          <link rel="apple-touch-icon" href="/image/pwa/192.png" />
          <link rel="apple-touch-icon" href="/image/pwa/384.png" />
          <link rel="apple-touch-icon" href="/image/pwa/512.png" />
          <meta name="apple-mobile-web-app-status-bar" content="#8ce8fa" />
          <meta name="theme-color" content="#8ce8fa" />
          {renderPagesStyle(page)}
        </Head>
        <Provider store={store}>
          {persistor && <Component {...pageProps} />}
        </Provider>
      </React.Fragment>
    );
  }
}
