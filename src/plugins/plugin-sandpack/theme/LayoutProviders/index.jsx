import React from 'react';
import LayoutProviders from '@theme-init/LayoutProviders';
import CodeHighlightsProvider from '../../lib/CodeHighlights';

export default function LayoutProvidersWrapper(props) {
  return (
    <CodeHighlightsProvider>
      <LayoutProviders {...props} />
    </CodeHighlightsProvider>
  );
}
