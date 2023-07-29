import { createElement, useEffect } from "react";

export function WeglotOptions({ apiKey, overwriteLanguage, cache, hideSwitcher, autoSwitch, autoSwitchFallback }) {
    useEffect(() => {
        // Create a script element
        const script = document.createElement("script");
        script.src = "https://cdn.weglot.com/weglot.min.js";
        script.async = true;

        // Append the script to the document head
        document.head.appendChild(script);

        // Function to handle language checking and swapping
        const handleLanguage = () => {
            if (overwriteLanguage && overwriteLanguage !== "") {
                const currentLanguage = Weglot.getCurrentLang();
                if (currentLanguage !== overwriteLanguage) {
                    setTimeout(() => {
                        Weglot.switchTo(overwriteLanguage);
                    }, 100);
                }
            }
        };

        // Initialize Weglot when the script is loaded
        script.onload = () => {
            Weglot.initialize({
                api_key: apiKey, // eslint-disable-line
                auto_switch: autoSwitch, // eslint-disable-line
                auto_switch_fallback: autoSwitchFallback, // eslint-disable-line
                hide_switcher: hideSwitcher, // eslint-disable-line
                cache: cache
            });

            // call a function when Weglot is initialized
            Weglot.on("initialized", handleLanguage);
        };

        // Cleanup function to remove Weglot when the component unmounts
        return () => {
            Weglot.remove();
            document.head.removeChild(script);
        };
    }, []); // Empty dependency array to ensure the initialization runs only once on mount

    return null;
}
