import { createElement, useEffect } from "react";

export function WeglotOptions({ apiKey, defaultLanguage }) {
    useEffect(() => {
        // Create a script element
        const script = document.createElement("script");
        script.src = "https://cdn.weglot.com/weglot.min.js";
        script.async = true;

        // Append the script to the document head
        document.head.appendChild(script);

        // Initialize Weglot when the script is loaded
        script.onload = () => {
            Weglot.initialize({
                api_key: apiKey,
                auto_switch: false,
                auto_switch_fallback: "en",
                hide_switcher: false,
                cache: false
            });

            // call a function when Weglot is initialized
            Weglot.on("initialized", handleLanguage);
        };

        // Function to handle language checking and swapping
        const handleLanguage = () => {
            if (defaultLanguage && defaultLanguage !== "") {
                const currentLanguage = Weglot.getCurrentLang();
                if (currentLanguage !== defaultLanguage) {
                    Weglot.switchTo(defaultLanguage);
                }
            }
        };

        // Cleanup function to remove Weglot when the component unmounts
        return () => {
            Weglot.remove();
            document.head.removeChild(script);
        };
    }, []); // Empty dependency array to ensure the initialization runs only once on mount

    return null;
}
