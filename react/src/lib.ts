import {
    getStandaloneCaller,
    loadNodeLib,
    loadStandaloneLogic,
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

let caller:ReturnType<typeof generateCaller>;

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

    const myLogic = loadStandaloneLogic(myLogicInterface, editorId);
    return getStandaloneCaller(myLogic, "out_exec");
}

export function getCaller() {
    if (!caller) {
        caller = generateCaller();
    }

    return caller;
}
