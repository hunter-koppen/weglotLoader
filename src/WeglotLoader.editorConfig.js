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
    return defaultProperties;
}
