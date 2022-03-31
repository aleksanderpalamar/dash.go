import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,300;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="favicon.ico" type="image/ico" />          
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#8769b3" />          
          
          <meta name="author" content="Palamar" />          
          <meta
            property="og:description"
            content="Dashboard."
          />
          <meta
            property="og:image"
            content="https://www.palamarsolutionit.com.br/images/favicon.svg"
          />          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}