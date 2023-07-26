import { createElement } from "react";

import { WeglotOptions } from "./components/WeglotOptions";

export function WeglotLoader({ apiKey, defaultLanguage }) {
    return <WeglotOptions apiKey={apiKey} defaultLanguage={defaultLanguage} />;
}
