const visit = require("unist-util-visit");

module.exports = function pluginRemarkShellCode(context, options) {
  return (tree) => {
    visit(tree, (node) => {
      // If the node is a code block, but the language is not set
      if (node.type === "code" && !node.lang) {
        // Set it to TypeScript
        node.lang = "shell";
      }
    });
  };
};
