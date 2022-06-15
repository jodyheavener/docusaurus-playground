import React from "react";
import { highlightColors } from "../../lib/util";
import styles from "./style.module.css";
import { useCodeHighlights } from "../../lib/CodeHighlights";

const Highlighter = (props) => {
  const {
    children,
    badge
  } = props;
  const { codeHighlights } = useCodeHighlights();
  const backgroundColor = codeHighlights[badge] ?? "#eee";

  return (
    <span data-badge={badge} style={{ backgroundColor }} className={styles.highlight}>{children}</span>
  );
};

export default Highlighter;
