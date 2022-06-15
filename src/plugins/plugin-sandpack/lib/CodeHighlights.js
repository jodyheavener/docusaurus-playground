import React, { useState, useMemo } from "react";

const Context = React.createContext({
	codeHighlights: {},
	setCodeHighlights: () => undefined,
});

const useContextValue = () => {
	const [codeHighlights, setCodeHighlights] = useState({});

  return useMemo(
    () => ({
      codeHighlights, setCodeHighlights,
    }),
    [codeHighlights, setCodeHighlights],
  );
};

const CodeHighlightsProvider = ({
	children,
}) => {
	const value = useContextValue();
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default CodeHighlightsProvider;

export const useCodeHighlights = () => {
	const context = React.useContext(Context);
	if (context === undefined) {
		throw new Error("CodeHighlightsProvider context not set");
	}
	return context;
};
