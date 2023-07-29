## WeglotLoader

A widget to have more control on the loading of Weglot, an automatic translate tool.

## Features

-   Control which language gets loaded on initialization
-   Hide/Show the language switcher to create a custom language switching experience.
-   Control whether to cache the loaded languages for improved performance.

## Usage

1. Go to the Weglot website to create an account and obtain your API Key.
2. Add the widget to all the layouts where you want to enable automatic translation and set the `API Key`.

## Language loading
Decide how you want to handle language loading in the WeglotLoader widget. You have three options:

*Default Weglot*: Load the original lanuage set in the Weglot dashboard.
*Automatic Language Detection*: The widget can automatically choose a language for translation based on the user's browser settings. This means visitors to your website will see content translated into their preferred language without any manual intervention.
*Manual Language Selection*: Alternatively, you can take more control over the language loading process. You have the flexibility to set the language manually, which allows you to customize the translation experience. For instance, you can retrieve a language preference from a user's account settings and use that as the language to load.

You can also choose to hide the language switcher. This is mostly useful if you want to create your own custom switcher
or if you want to switch the language based on some user's account settings.

## Issues, suggestions and feature requests

https://github.com/hunter-koppen/weglotLoader/issues
