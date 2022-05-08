module.exports = function pluginGoogleFonts(context, options) {
  return {
    name: "plugin-google-fonts",

    injectHtmlTags: () => ({
    // Tell the browser we're going to be loading resources from these origins
      headTags: [
        {
          tagName: "link",
          attributes: {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          },
        },
        {
          tagName: "link",
          attributes: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: "anonymous",
          },
        },
        // Load the Roboto font in our desired weights
        {
          tagName: "link",
          attributes: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
          },
        },
      ],
    })
  }
};
