import React, { useLayoutEffect, useState } from "react";
import { getCaller, initEditor, editorId } from "../../lib";
import "./LunaParkEditor.scss";

export function LunaParkEditor() {
    const [loaded, setLoaded] = useState(false);

    useLayoutEffect(() => {
        initEditor();
        getCaller();
        setLoaded(true);
    }, []);

    return (
        <div className="editor-wrapper">
            {loaded &&
                <>
                    <lp-tab-strip editor-id={editorId} class="tab-strip" standalone={true}/>
                    <lp-logic-editor editor-id={editorId} class="editor"/>
                    <lp-console-panel editor-id={editorId} class="console"/>
                    <lp-inspector-panel editor-id={editorId} class="inspector"/>
                </>
            }
        </div>
    );
}
