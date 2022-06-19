import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { colorModeConfig } from '../style/theme/config';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray(initialProps.styles),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/_next/image?url=%2Ffavicon.ico&w=96&q=75" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={colorModeConfig.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
