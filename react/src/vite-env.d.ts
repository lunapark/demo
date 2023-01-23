/// <reference types="vite/client" />

import { DOMAttributes } from "react";
import { LpThemeElement, LpTabStrip, LpLogicEditor, LpConsolePanel, LpInspectorPanel } from "luna-park";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['lp-theme']: CustomElement<LpThemeElement>;
            ['lp-tab-strip']: CustomElement<LpTabStrip>;
            ['lp-logic-editor']: CustomElement<LpLogicEditor>;
            ['lp-console-panel']: CustomElement<LpConsolePanel>;
            ['lp-inspector-panel']: CustomElement<LpInspectorPanel>;
        }
    }
}
