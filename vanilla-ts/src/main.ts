import "./style.css";
import "luna-park";
import {
    getStandaloneCaller,
    loadNodeLib,
    loadStandaloneLogic,
    LpConsolePanel, LpInspectorPanel,
    LpLogicEditor, LpTabStrip,
    TLogicInterface
} from "luna-park";
import { LogicNodes as LogicNodesStandard } from "@luna-park/lib-standard";
import { LogicNodes as LogicNodesString } from "@luna-park/lib-string";
import { LogicNodes as LogicNodesMath } from "@luna-park/lib-math";
import { LogicType } from "@luna-park/logicnodes";

const editorId = "demo-editor";

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

const myLogic = loadStandaloneLogic(myLogicInterface, editorId);
const caller = getStandaloneCaller(myLogic, "out_exec");

document.querySelector("#editor")?.append(new LpLogicEditor({ editorId }));
document.querySelector("#console")?.append(new LpConsolePanel({ editorId }));
document.querySelector("#inspector")?.append(new LpInspectorPanel({ editorId }));
document.querySelector("#tab-strip")?.append(new LpTabStrip({ editorId, standalone: true }));

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
