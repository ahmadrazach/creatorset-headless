import { Html, Main, Head, NextScript } from "next/document";
import { rootUrl } from "../../common/constants";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Creator Set</title>
                <meta property="og:url" content={rootUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Creator Set" />
                <meta name="twitter:card" content="summary" />
                <meta
                    property="og:description"
                    content="Creator Set App developed Using Next.js"
                />
                <meta
                    property="og:image"
                    content={`${rootUrl}/images/CreatorSet-Text-Logo.png`}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
