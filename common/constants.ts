export const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
export const STORE_FRONT_ACCESS_TOKEN =
    process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
export const CONTENT_TYPE = "application/json";
export const rootUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
export const END_POINT = `https://${DOMAIN}/api/2023-04/graphql.json`;
export const SEARCH_END_POINT = `https://${DOMAIN}/api/2023-07/graphql.json`;
export const TWITTER_INTENT_URL = "https://twitter.com/intent/tweet";
export const MAIN_WEBSITE_URL = process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL;
export const TWITTER_SHORT_URL_LENGTH = 23;
export const MAX_TWEET_LENGTH = 280;
export const BUNDLE_3_DISCOUNT =
    process.env.NEXT_PUBLIC_SHOPIFY_BUNDLE_3_DISCOUNT || "";
export const BUNDLE_4_DISCOUNT =
    process.env.NEXT_PUBLIC_SHOPIFY_BUNDLE_4_DISCOUNT || "";
export const BUNDLE_5_DISCOUNT =
    process.env.NEXT_PUBLIC_SHOPIFY_BUNDLE_5_DISCOUNT || "";

export const faqs = {
    group1: [
        {
            title: "Can I change the profile picture or the subscriber count on my animation?",
            description: `Yes you can, we offer one free update. Go to the <a href="https://studio.creatorset.com/">CreatorSet Studio</a>, register if you haven't already. Then, you will be able to access your orders and update any animation you purchased.`,
        },
        {
            title: "My download link expired, how can I get a new one?",
            description: `You can access the <a href="https://studio.creatorset.com/">CreatorSet Studio</a> and download any of your orders. You can also contact us on twitter and we will send you a new link.`,
        },
        {
            title: "Can I use my animations while streaming?",
            description:
                "Yes, using your favorite streaming software, such as OBS, you can create a media source and simply select your .mov file",
        },
        {
            title: "What file format will I receive?",
            description:
                "We will send you both an .mp4 and an .mov. So you can use it on your mobile device and your desktop!",
        },
        {
            title: "I payed with PayPal, where will I receive my order?",
            description:
                "We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter.",
        },
    ],
    group2: [
        {
            title: "Are animations compatible with CapCut?",
            description: `Yes, you can use our animations with CapCut. You can watch this <a href="http://localhost:3000/collections/all-products/products/how-to-add-pop-up-animations-in-capcut-tutorial">tutorial</a>`,
        },
        {
            title: "Does it work on mobile devices?",
            description:
                "Yes, all you need is an editing app on your device that supports Chroma Keying. Which is a feature that removes the background of a video.",
        },
        {
            title: "Can I loop the animations with a delay in between on my livestream using OBS/Streamlabs OBS?",
            description: `Yes you can!
            OBS users: Simply download this <a href="https://cdn.shopify.com/s/files/1/0273/8080/9781/files/RepeatMedia.lua?v=1617696751">plugin</a> and follow <a href="https://www.youtube.com/watch?v=g3J_5uTiF5A">this tutorial</a>.
            SLOBS users: Follow <a href="https://streamable.com/402hjd">this tutorial</a> for Streamlabs OBS.`,
        },
        {
            title: "How to get rid of the green/red background?",
            description: "",
        },
    ],
};

export const countriesData = [
    { value: "US", label: "USD" },
    { value: "EU", label: "EUR" },
    { value: "PK", label: "PKR" },
    { value: "IN", label: "INR" },
    { value: "CA", label: "CAD" }, // Canada
    { value: "JP", label: "JPY" }, // Japan
    { value: "GB", label: "GBP" }, // United Kingdom
    { value: "AU", label: "AUD" }, // Australia
    { value: "NZ", label: "NZD" }, // New Zealand
    { value: "MX", label: "MXN" }, // Mexico
];

export const footerLinks = {
    group1: [
        {
            title: "Search",
            link: "/search",
        },
        {
            title: "CreatorSet Studio",
            link: "https://studio.creatorset.com",
            newTab: true,
        },
        {
            title: "Sell Your Own Assets",
            link: "/apply",
        },
        {
            title: "Need Help?",
            link: "/instructions",
        },
    ],
    group2: [
        {
            title: "Tutorials",
            link: `${MAIN_WEBSITE_URL}/a/help`,
        },
        {
            title: "Affiliates",
            link: "https://partners.creatorset.com",
        },
        {
            title: "Reviews",
            link: `${MAIN_WEBSITE_URL}/pages/reviews`,
        },
        {
            title: "Contact",
            link: `${MAIN_WEBSITE_URL}/pages/contact-us`,
        },
    ],
    group3: [
        {
            title: "About us",
            link: `${MAIN_WEBSITE_URL}/pages/about`,
        },
        {
            title: "License",
            link: `${MAIN_WEBSITE_URL}/pages/license`,
        },
        {
            title: "Terms of Service",
            link: `${MAIN_WEBSITE_URL}/policies/terms-of-service`,
        },
        {
            title: "Refund Policy",
            link: `${MAIN_WEBSITE_URL}/policies/refund-policy`,
        },
    ],
};

export const mobileFooterLinks = {
    group1: [
        {
            title: "Search",
            link: "/search",
        },
        {
            title: "CreatorSet Studio",
            link: "https://studio.creatorset.com",
            newTab: true,
        },
        {
            title: "Sell Your Own Assets",
            link: "/apply",
        },
        {
            title: "Need Help?",
            link: "/instructions",
        },
    ],
    group2: [
        {
            title: "Tutorials",
            link: `${MAIN_WEBSITE_URL}/a/help`,
        },
        {
            title: "Affiliates",
            link: "https://partners.creatorset.com",
        },
        {
            title: "Reviews",
            link: `${MAIN_WEBSITE_URL}/pages/reviews`,
        },
        {
            title: "Contact",
            link: `${MAIN_WEBSITE_URL}/pages/contact-us`,
        },
    ],
    group3: [
        {
            title: "About us",
            link: `${MAIN_WEBSITE_URL}/pages/about`,
        },
        {
            title: "License",
            link: `${MAIN_WEBSITE_URL}/pages/license`,
        },
    ],
    group4: [
        {
            title: "Terms of Service",
            link: `${MAIN_WEBSITE_URL}/policies/terms-of-service`,
        },
        {
            title: "Refund Policy",
            link: `${MAIN_WEBSITE_URL}/policies/refund-policy`,
        },
    ],
};

export const whatCanYouSell = [
    {
        title: "Animations",
        description: "Pre-rendered animations.(.mov, .mp4, green screens)",
        imgLight: "/images/meterBlack.svg",
        imgDark: "/images/meter.svg",
    },
    {
        title: "Presets",
        description:
            "Presets for popular software like Premiere Pro, Final Cut Pro, After Effects, Vegas Pro, etc.",
        imgLight: "/images/presetBlack.svg",
        imgDark: "/images/preset.svg",
    },
    {
        title: "Editing Packs",
        description:
            "VFX, SFX, transitions or anything that can help creators step up their content.",
        imgLight: "/images/editing.svg",
        imgDark: "",
    },
    {
        title: "Graphics",
        description:
            "Pre-made graphics, Photoshop templates, thumbnails, images, etc.",
        imgLight: "/images/graphicsBlack.svg",
        imgDark: "/images/graphics.svg",
    },
    {
        title: "Creative",
        description:
            "We're open for suggestions! Let your creativity guide us.",
        imgLight: "/images/creativeBlack.svg",
        imgDark: "/images/creative.svg",
    },
];

export const IMAGE = `images(first: 5) {
    edges {
      node {
        originalSrc
        altText
      }
    }
  }`;

export const PRICE_RANGE = `priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }`;

export const VARIANT = `variants(first: 8) {
    edges {
      node {
        sku 
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
        }
        title
        id
        availableForSale
        priceV2 {
          amount
        }
        compareAtPrice{
          amount,
          currencyCode
        }
      }
    }
  }`;
export const NODE = `node {
    id
    title
    handle
    description
    delivered_files:metafield(namespace: "global", key: "delivered_files") {
     type
     value
    }
    fields:metafield(namespace: "global", key: "fields") {
      type
      value
    }
    whatyouget:metafield(namespace: "global", key: "whatyouget") {
      type
      value
     }
    productType
    media(first: 10) {
      edges {
          node {
            mediaContentType
            alt
            ...mediaFieldsByType
          }
        }
      }
    vendor
    ${PRICE_RANGE}
    ${IMAGE} 
    ${VARIANT}     
  }`;

export const PRODUCT_SEARCH_NODE = `node {
    ... on Product {
      id
      title
      handle
      description
      delivered_files:metafield(namespace: "global", key: "delivered_files") {
      type
      value
      }
      fields:metafield(namespace: "global", key: "fields") {
        type
        value
      }
      whatyouget:metafield(namespace: "global", key: "whatyouget") {
        type
        value
      }
      productType
      media(first: 10) {
        edges {
            node {
              mediaContentType
              alt
              ...mediaFieldsByType
            }
          }
        }
      vendor
      ${PRICE_RANGE}
      ${IMAGE} 
      ${VARIANT}
    }
  }`;
