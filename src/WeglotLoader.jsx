import { createElement } from "react";

import { WeglotOptions } from "./components/WeglotOptions";

export function WeglotLoader({
    apiKey,
    overwriteLanguage,
    cache,
    hideSwitcher,
    languageLoad,
    autoSwitchFallback,
    unloadtranslation,
    translationStrategy,
    excludedElements,
    includedElements
}) {
    // Check if all nessecary values are available
    if ((!overwriteLanguage || overwriteLanguage.status === "available") && apiKey) {
        const manualLanguage = languageLoad === "manual" ? overwriteLanguage?.value : undefined;
        const autoSwitch = languageLoad === "automatic";

        return (
            <WeglotOptions
                apiKey={apiKey}
                overwriteLanguage={manualLanguage}
                cache={cache}
                hideSwitcher={hideSwitcher}
                autoSwitch={autoSwitch}
                autoSwitchFallback={autoSwitchFallback}
                unloadtranslation={unloadtranslation}
                translationStrategy={translationStrategy}
                excludedElements={excludedElements}
                includedElements={includedElements}
            />
        );
    } else {
        return null;
    }
}
