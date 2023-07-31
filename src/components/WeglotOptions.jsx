import { createElement, useEffect } from "react";
import { useUnmount } from "react-use";

export function WeglotOptions({
    apiKey,
    overwriteLanguage,
    cache,
    hideSwitcher,
    autoSwitch,
    autoSwitchFallback,
    unloadtranslation
}) {
    const initializeWeglot = () => {
        // If a switcher already exists, show it again.
        const switcher = document.querySelector("body > .weglot-container.hidden");
        if (switcher !== null) {
            switcher.classList.remove("hidden");
        }

        Weglot.initialize({
            api_key: apiKey, // eslint-disable-line
            auto_switch: autoSwitch, // eslint-disable-line
            auto_switch_fallback: autoSwitchFallback, // eslint-disable-line
            hide_switcher: hideSwitcher, // eslint-disable-line
            cache: cache
        });

        // Function to handle language checking and swapping
        const handleLanguage = () => {
            if (overwriteLanguage && overwriteLanguage !== "") {
                const currentLanguage = Weglot.getCurrentLang();
                if (currentLanguage !== overwriteLanguage) {
                    setTimeout(() => {
                        Weglot.switchTo(overwriteLanguage.toLowerCase());
                    }, 100);
                }
            }
        };

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
        scriptMinified.async = true;
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
        // first switch back to the original language
        const originalLanguage = Weglot.getAvailableLanguages()[0];
        if (originalLanguage) {
            Weglot.switchTo(originalLanguage);
        }
        // then remove the minified script
        const scriptMinified = document.querySelector("#weglot-minified");
        if (scriptMinified !== null) {
            scriptMinified.remove();
        }
        // then hide the switcher, we cannot destroy it otherwise it wont come back
        const switcher = document.querySelector("body > .weglot-container");
        if (switcher !== null) {
            switcher.classList.add("hidden");
        }
    });

    return null;
}
