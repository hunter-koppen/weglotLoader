import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/WeglotLoader.css";

export function WeglotLoader({ sampleText }) {
    return <HelloWorldSample sampleText={sampleText} />;
}
