import { createElement } from "react";

import { WeglotOptions } from "./components/WeglotOptions";

export function WeglotLoader({ apiKey, defaultLanguage, cache, hideSwitcher }) {
    // Check if all nessecary values are available
    if (!defaultLanguage || defaultLanguage.status === "available") {
        return (
            <WeglotOptions
                apiKey={apiKey}
                defaultLanguage={defaultLanguage?.value}
                cache={cache}
                hideSwitcher={hideSwitcher}
            />
        );
    } else {
        return null;
    }
}
