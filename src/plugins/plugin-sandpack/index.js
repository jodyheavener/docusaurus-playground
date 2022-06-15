const path = require("path");

function plugin() {
  return {
    name: "plugin-sandpack",

    getThemePath() {
      return path.resolve(__dirname, "./theme");
    },
  };
}

module.exports = plugin;
