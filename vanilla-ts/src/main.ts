import "./style.css";
import "luna-park";
import {
    getLogicCaller,
    loadNodeLib,
    initLogic,
    setAPIKey,
    TLogicInterface
} from "luna-park";
import { LogicNodes as LogicNodesStandard } from "@luna-park/lib-standard";
import { LogicNodes as LogicNodesString } from "@luna-park/lib-string";
import { LogicNodes as LogicNodesMath } from "@luna-park/lib-math";
import { LogicType } from "@luna-park/logicnodes";

const editorId = "demo-editor";

setAPIKey("lp_public:abc123");
loadNodeLib(editorId, LogicNodesStandard);
loadNodeLib(editorId, LogicNodesString);
loadNodeLib(editorId, LogicNodesMath);

const myLogicInterface = {
    inputs: {
        in_exec: { name: "", schema: LogicType.exec() },
        in_A: { name: "A", schema: LogicType.number() },
        in_B: { name: "B", schema: LogicType.string() }
    },
    outputs: {
        out_exec: { name: "", schema: LogicType.exec() },
        out_C: { name: "C", schema: LogicType.number() },
        out_D: { name: "D", schema: LogicType.boolean() }
    }
} satisfies TLogicInterface;

const myLogic = initLogic(myLogicInterface, editorId);
const caller = getLogicCaller(myLogic, "out_exec");

const editorWrapperElement = document.querySelector("#editor-wrapper");

if (editorWrapperElement) {
    editorWrapperElement.innerHTML = `
<lp-tab-strip editor-id=${editorId} class="tab-strip" standalone></lp-tab-strip>
<lp-logic-editor editor-id=${editorId} class="editor"></lp-logic-editor>
<lp-console-panel editor-id=${editorId} class="console"></lp-console-panel>
<lp-inspector-panel editor-id=${editorId} class="inspector"></lp-inspector-panel>
    `.trim();
}


async function triggerCaller() {
    const inputElement = document.querySelector("#input");
    const outputElement = document.querySelector("#output");

    if (!inputElement || !outputElement) {
        return;
    }

    const input = {
        in_A: (document.querySelector("#inputA") as HTMLInputElement).valueAsNumber,
        in_B: (document.querySelector("#inputB") as HTMLInputElement).value,
    }
    const output = await caller(input);

    inputElement.innerHTML = JSON.stringify(input, null, 2);
    outputElement.innerHTML = JSON.stringify(output, null, 2);
}

document.querySelector("#launch-button")?.addEventListener("click", triggerCaller);
