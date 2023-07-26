import {
    exportLogic,
    getLogicCaller,
    loadNodeLib, loadSavedLogic,
    initLogic,
    setAPIKey,
    TLogicInterface
} from "luna-park";
import { LogicNodes as LogicNodesStandard } from "@luna-park/lib-standard";
import { LogicNodes as LogicNodesString } from "@luna-park/lib-string";
import { LogicNodes as LogicNodesMath } from "@luna-park/lib-math";
import { LogicType } from "@luna-park/logicnodes";

export const editorId = "demo-editor";

export function initEditor() {
    setAPIKey("lp_public:abc123");
    loadNodeLib(editorId, LogicNodesStandard);
    loadNodeLib(editorId, LogicNodesString);
    loadNodeLib(editorId, LogicNodesMath);
}

let caller: ReturnType<typeof generateCaller>;

function generateCaller() {
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
    return getLogicCaller(myLogic, "out_exec", editorId);
}

export function saveLogic() {
    const savedLogic = exportLogic(editorId);
    localStorage.setItem("savedLogic", JSON.stringify(savedLogic));
    alert("Logic graph saved to local storage!");
}

export async function loadLogic() {
    const loadedLogic = localStorage.getItem("savedLogic");
    if (!loadedLogic) {
        alert("No logic graph found in local storage...");
        return;
    }
    const myLogic = loadSavedLogic(loadedLogic, editorId);
    caller = getLogicCaller(myLogic, "out_exec", editorId);
}

export function getCaller() {
    if (!caller) {
        caller = generateCaller();
    }

    return caller;
}
