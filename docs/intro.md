---
title: Example highlighting
sidebar_position: 1
---

import Highlighter from '@theme/Highlighter';

## Secret reference example

```shell [["a", 1, "Management"], ["b", 1, "PagerDuty"], ["c", 1, "Admin"], ["d", 1, "email"]]
op://Management/PagerDuty/Admin/email
```

A secret reference consists of a <Highlighter badge="a">vault</Highlighter>, an <Highlighter badge="b">item</Highlighter>, an <Highlighter badge="c">optional section</Highlighter>, and a <Highlighter badge="d">field</Highlighter>.

## Advanced example

```js title="/src/components/HelloCodeTitle.js" showLineNumbers {1,4-6} [["1", 1, "metastring"], ["2", 2, "HIGHLIGHT_REGEX"], ["4", 7, "parsedMetastring[1]"]]
function getHighlightLines(metastring) {
  const HIGHLIGHT_REGEX = /{([\d,-]+)}/;
  const parsedMetastring = HIGHLIGHT_REGEX.exec(metastring);
  if (!parsedMetastring) {
    return [];
  }
  return rangeParser(parsedMetastring[1]);
}
```
