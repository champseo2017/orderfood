import App from 'next/app';

export default class MyApp extends App {
    render() {
      const { Component, pageProps, store } = this.props;
      return (
          <Component {...pageProps} />
      );
    }
}