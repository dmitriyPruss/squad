const env = process.env.NODE_ENV || "development";
const serverIP = "localhost";
const serverPort = 5000;

const CONSTANTS = {
  CONTACTS: {
    TEL: "(877)355-3585",
  },
  CUSTOMER: "customer",
  CREATOR: "creator",
  MODERATOR: "moderator",

  CONTEST: {
    NAME: "name",
    LOGO: "logo",
    TAGLINE: "tagline",
  },

  STATUS: {
    CONTEST: {
      ACTIVE: "active",
      FINISHED: "finished",
      PENDING: "pending",
    },
    OFFER: {
      PENDING: "pending",
      REJECTED: "rejected",
      WON: "won",
    },
  },

  STATIC_IMAGES_PATH: "/staticImages/",
  ANONYM_IMAGE_PATH: "/staticImages/anonym.png",
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: "accessToken",
  PUBLIC_URL:
    env === "production"
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,

  PREVIEW_CHAT_MODE: {
    FAVORITE: "FAVORITE",
    BLOCKED: "BLOCKED",
    CATALOG: "CATALOG",
    NORMAL: "NORMAL",
  },

  CHANGE_BLOCK_STATUS: "CHANGE_BLOCK_STATUS",
  ADD_CHAT_TO_OLD_CATALOG: "ADD_CHAT_TO_OLD_CATALOG",
  CREATE_NEW_CATALOG_AND_ADD_CHAT: "CREATE_NEW_CATALOG_AND_ADD_CHAT",
  USER_INFO_MODE: "USER_INFO_MODE",
  CASHOUT_MODE: "CASHOUT_MODE",
  HEADER_ANIMATION_TEXT: [
    "a Company",
    "a Brand",
    "a Website",
    "a Service",
    "a Book",
    "a Business",
    "an App",
    "a Product",
    "a Startup",
  ],
  FooterItems: [
    {
      title: "SQUADHELP",
      items: ["About", "Contact", "How It Works?", "Testimonials", "Our Work"],
    },
    {
      title: "RESOURCES",
      items: [
        "How It Works",
        "Become a Creative",
        "Business Name Generator",
        "Discussion Forum",
        "Blog",
        "Download eBook",
        "Pricing",
        "Help & FAQs",
      ],
    },
    {
      title: "OUR SERVICES",
      items: [
        "Naming",
        "Logo Design",
        "Taglines",
        "Premium Names For Sale",
        "Creative Owned Names For Sale",
        "Audience Testing",
        "Trademark Research & Filling",
        "Managed Agency Service",
      ],
    },
    {
      title: "LEGAL",
      items: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
  ],
  HOW_IT_WORKS: {
    PLAY_VIDEO: {
      link: "https://vimeo.com/368584367",
      text: "Play Video",
    },
    CONTEST_LIST: [
      {
        link: "#contests",
        text: "Launching A Contest",
      },
      {
        link: "#marketplace",
        text: "Buying From Marketplace",
      },
      {
        link: "#managed",
        text: "Managed Contests",
      },
      {
        link: "#creatives",
        text: "For Creatives",
      },
    ],
    SQUADHELP_LINKS: [
      "https://www.squadhelp.com/Name-Ideas",
      "https://www.squadhelp.com/tagline-slogan-ideas",
      "https://www.squadhelp.com/logo-design-examples",
    ],
    COMPANY_LINKS: {
      forbes: {
        path: "https://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199/?sh=6b5e55e46145",
        image:
          "https://www.squadhelp.com/resources/assets/imgs/front/forbes.svg",
      },
      tnw: {
        path: "https://thenextweb.com/latest",
        image: "https://www.squadhelp.com/resources/assets/imgs/front/TNW.svg",
      },
      chicagoTribune: {
        path: "https://www.chicagotribune.com/business/blue-sky/ct-squadhelp-startup-names-bsi-20170331-story.html",
        image:
          "https://www.squadhelp.com/resources/assets/imgs/front/chicago.svg",
      },
      mashable: {
        path: "https://mashable.com/archive/make-money-crowdworking",
        image:
          "https://www.squadhelp.com/resources/assets/imgs/front/Mashable.svg",
      },
    },
    START_CONTEST: {
      link: "https://www.squadhelp.com/start-contest",
      text: "Start A Contest",
    },
    TOOL_LINKS: {
      stars: {
        link: "https://www.squadhelp.com/resources/assets/imgs/front/stars.svg",
        altText: "stars",
      },
      users: {
        link: "https://www.squadhelp.com/resources/assets/imgs/front/img2(1).png",
        altText: "users",
      },
      sharingFiles: {
        link: "https://www.squadhelp.com/resources/assets/imgs/front/sharing-files.svg",
        altText: "sharing files",
      },
    },
  },
  BUTTON_GROUP_DATA: [
    {
      header: "Yes",
      main: "The Domain should exactly match the name",
    },
    {
      header: "Yes",
      main: "But minor variants are allowed (Recommended)",
    },
    {
      header: "No",
      main: "I am only looking for a name, not a Domain",
    },
  ],
  PRICING_PAGE: {
    testingReportLink:
      "https://www.squadhelp.com/assets/nimages/AudienceTestingReport.pdf",
    managedContestsLink: "https://www.squadhelp.com/managed-contests",
  },
};

export default CONSTANTS;
