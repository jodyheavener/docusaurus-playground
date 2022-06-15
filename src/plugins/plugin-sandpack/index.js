const path = require("path");

function theme() {
  return {
    name: "plugin-sandpack",

    getThemePath() {
      return path.resolve(__dirname, "./theme");
    },
  };
}

module.exports = theme;
