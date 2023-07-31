import { createElement, useEffect } from "react";
import { useUnmount } from "react-use";

export function WeglotOptions({
    apiKey,
    overwriteLanguage,
    cache,
    hideSwitcher,
    autoSwitch,
    autoSwitchFallback,
    unloadtranslation,
    excludedElements
}) {
    const handleLanguage = () => {
        // If there is an overwrite language set we have to switch to that language once loaded
        if (overwriteLanguage && overwriteLanguage !== "") {
            const currentLanguage = Weglot.getCurrentLang();
            if (currentLanguage !== overwriteLanguage) {
                setTimeout(() => {
                    Weglot.switchTo(overwriteLanguage.toLowerCase());
                }, 100);
            }
        }
    };

    const initializeWeglot = () => {
        // If a switcher already exists, show it again.
        document.querySelector("body > .weglot-container.hidden")?.classList.remove("hidden");

        const excludedArray = excludedElements?.map(element => ({ value: element.excludeSelector })) || null;

        Weglot.initialize({
            api_key: apiKey, // eslint-disable-line
            auto_switch: autoSwitch, // eslint-disable-line
            auto_switch_fallback: autoSwitchFallback, // eslint-disable-line
            hide_switcher: hideSwitcher, // eslint-disable-line
            cache: cache,
            excluded_blocks: excludedArray // eslint-disable-line
        });

        Weglot.on("initialized", handleLanguage);
    };

    useEffect(() => {
        const scriptMinifiedExists = document.querySelector("#weglot-minified");

        if (scriptMinifiedExists) {
            // if the script is already loaded we dont need to initialize again.
            return;
        }

        // Create a script element
        const scriptMinified = document.createElement("script");
        scriptMinified.src = "https://cdn.weglot.com/weglot.min.js";
        scriptMinified.defer = true;
        scriptMinified.id = "weglot-minified";

        // Append the script to the document head
        document.head.appendChild(scriptMinified);

        // Initialize Weglot when the script is loaded
        scriptMinified.onload = initializeWeglot;
    }, []); // Empty dependency array to ensure the initialization runs only once on mount

    useUnmount(() => {
        if (!unloadtranslation) {
            return;
        }

        // before unloading reset back to original language
        const originalLanguage = Weglot.getAvailableLanguages()[0];
        if (originalLanguage) {
            Weglot.switchTo(originalLanguage);
        }

        document.querySelector("#weglot-minified")?.remove();
        document.querySelector("body > .weglot-container")?.classList.add("hidden");
    });

    return null;
}
