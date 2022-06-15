import {
  SandpackCodeViewer,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import React, { useEffect } from "react";
import {
  parseCodeBlockTitle,
  parseLanguage,
  containsLineNumbers,
} from '@docusaurus/theme-common';
import { sandpackDark, githubLight } from "@codesandbox/sandpack-themes";
import { useColorMode } from '@docusaurus/theme-common';
import rangeParser from 'parse-numeric-range';
import styles from "./style.module.css";
import { highlightColors } from "../../lib/util";
import { useCodeHighlights } from "../../lib/CodeHighlights";

const RenderSandpack = (props) => {
  const {
    children,
    metastring,
    showLineNumbers: showLineNumbersProp,
    language: languageProp,
    className: blockClassName,
  } = props;

  const { setCodeHighlights } = useCodeHighlights();

  const getDecoratedLineInfo = () => {
    if (!metastring) {
      return [];
    }

    const linesToHighlight = getHighlightLines(metastring);
    const highlightedLineConfig = linesToHighlight.map((line) => {
      return {
        className: styles.lineHighlight,
        line,
      };
    });

    const inlineHighlightLines = getInlineHighlights(metastring, children);
    const inlineHighlightConfig = inlineHighlightLines.map(
      (line, index) => ({
        ...line,
        elementAttributes: {
          "data-badge": `${line.badge}`,
          "data-color": `${highlightColors[index % highlightColors.length]}`,
          style: `background-color: ${highlightColors[index % highlightColors.length]};`,
        },
        className: styles.inlineHighlight,
      })
    );

    return highlightedLineConfig.concat(inlineHighlightConfig);
  };

  const { colorMode } = useColorMode();
  const showLineNumbers = showLineNumbersProp || containsLineNumbers(metastring);
  const title = parseCodeBlockTitle(metastring) ?? titleProp;
  const language = languageProp ?? parseLanguage(blockClassName) ?? "shell";
  const code = children.trimEnd();
  const filename = '/index.' + language;
  const theme = colorMode === "dark" ? sandpackDark : githubLight;
  const decorators = getDecoratedLineInfo();
  const decoratorPairs = Object.fromEntries(
    decorators.filter(d => "elementAttributes" in d)
      .map((d) => ([d.elementAttributes['data-badge'], d.elementAttributes['data-color']]))
  );

  useEffect(() => {
    // setCodeHighlights((existing) => ({ ...existing, ...decoratorPairs }));
  }, [decoratorPairs, setCodeHighlights])

  return (
    <SandpackProvider
      customSetup={{
        entry: filename,
      }}
      files={{
        [filename]: code,
      }}
      {...{ theme }}
    >
      <SandpackCodeViewer key={code} {...{ showLineNumbers, language, decorators }} />
    </SandpackProvider>
  );
};

export default RenderSandpack;

function getHighlightLines(metastring) {
  const HIGHLIGHT_REGEX = /{([\d,-]+)}/;
  const parsedMetastring = HIGHLIGHT_REGEX.exec(metastring);

  if (!parsedMetastring) {
    return [];
  }

  return rangeParser(parsedMetastring[1]);
}

function getInlineHighlights(metastring, code) {
  const INLINE_HIGHLIGHT_REGEX = /(\[\[.*\]\])/;
  const parsedMetastring = INLINE_HIGHLIGHT_REGEX.exec(metastring);
  if (!parsedMetastring) {
    return [];
  }

  const lines = code.split('\n');
  const encodedHighlights = JSON.parse(parsedMetastring[1]);

  return encodedHighlights.map(([badge, lineNo, substr, fromIndex]) => {
    const line = lines[lineNo - 1];
    let index = line.indexOf(substr);
    const lastIndex = line.lastIndexOf(substr);

    if (index !== lastIndex) {
      if (fromIndex === undefined) {
        throw Error(
          "Found '" + substr + "' twice. Specify fromIndex as the fourth value in the tuple."
        );
      }

      index = line.indexOf(substr, fromIndex);
    }

    if (index === -1) {
      throw Error("Could not find: '" + substr + "'");
    }

    return {
      badge,
      line: lineNo,
      startColumn: index,
      endColumn: index + substr.length,
    };
  });
}
