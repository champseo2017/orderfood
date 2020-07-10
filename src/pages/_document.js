import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head />
        <body className="h-100">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}