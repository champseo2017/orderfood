import App from "next/app";
import Head from "next/head";

export default class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1.0,initial-scale=1.0, user-scalable=no"
          />
          {/* 
     
      pwa
     
     */}
          <link rel="manifest" href="/manifest.json" />

          {/*
    
    ios support
    
    */}
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
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
