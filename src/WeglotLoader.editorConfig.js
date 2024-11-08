import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";

export function getProperties(values, defaultProperties, target) {
    if (values.languageLoad === "default") {
        hidePropertyIn(defaultProperties, values, "autoSwitchFallback");
        hidePropertyIn(defaultProperties, values, "overwriteLanguage");
    } else if (values.languageLoad === "automatic") {
        hidePropertyIn(defaultProperties, values, "overwriteLanguage");
    } else if (values.languageLoad === "manual") {
        hidePropertyIn(defaultProperties, values, "autoSwitchFallback");
    }

    if (values.translationStrategy === "exclusion") {
        hidePropertyIn(defaultProperties, values, "includedElements");
    } else {
        hidePropertyIn(defaultProperties, values, "excludedElements");
    }

    return defaultProperties;
}
