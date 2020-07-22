import App from "next/app";
import Head from "next/head";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "../redux/reducers";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";


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
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1.0,initial-scale=1.0, user-scalable=no"
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
        </Head>
        <Provider store={store}>
          {persistor && <Component {...pageProps} />}
        </Provider>
      </React.Fragment>
    );
  }
}
