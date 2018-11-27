import Document, { Head, Main, NextScript } from "next/document";
import { JSONLD, Generic } from "react-structured-data";

import { library } from "@fortawesome/fontawesome-svg-core"; // FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

library.add();

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  componentDidUpdate() {
    // console.log("DOC", this.props);
  }

  render() {
    return (
      <html>
        <Head>
          {/* <meta name="theme-color" content="#79B83E" /> */}
          <title>Package Fulfillment Internal System</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          {/* <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content=""
          />
          <meta
            name="description"
            content=""
          />
          <meta
            name="copyright"
            content=""
          /> */}
          {/* <link rel="manifest" href="/_next/static/manifest.json" /> */}
          <link
            href="../static/fonts/DINPro-Medium/styles.css"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
          {/* <link rel="icon" href="static/favicon.ico" /> */}

          {/* <JSONLD>
            <Generic
              type="webApplication"
              jsonldtype="WebApplication"
              schema={{
                applicationCategory: "Multimedia",
                browserRequirements: "requires HTML5 support"
              }}
            />
          </JSONLD> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <div className="w-full flex-1 h-screen content-center text-center">
              {/* <FontAwesomeIcon icon={faExclamationTriangle} className="img-error " /> */}
              {/* <img
                src="../static/images/Thumbnail.png"
                alt="No JavaScript"
                className="img-error"
              /> */}
              <h1 className="mt-10 title-message">JavaScript is Required.</h1>
              <h3 className="mt-2 subtitle-message">
                Enable JavaScript in your browser and try again.
              </h3>
            </div>
          </noscript>
        </body>
      </html>
    );
  }
}
// <link rel="icon" href="static/images/favicon.png"/>
