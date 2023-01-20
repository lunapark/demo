<template>
    <div class="app">
        <lp-theme primary="#ffff00" tint="#000000"/>
        <button @click="triggerLogic">Trigger logic</button>
        <div class="editor" ref="editorWrapper"></div>
        <div class="console" ref="consoleWrapper"></div>
    </div>
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
    LpLogicEditor,
    loadNodeLib,
    LpEditorConsole,
    TLogicInterface,
    loadStandaloneLogic,
    getStandaloneCaller
} from "luna-park";
import { LogicNodes as LogicNodesStandard } from "@luna-park/lib-standard";
import { LogicNodes as LogicNodesString } from "@luna-park/lib-string";
import { LogicType } from "@luna-park/logicnodes";

const editorWrapper = ref<HTMLDivElement>();
const consoleWrapper = ref<HTMLDivElement>();
const editorId = "demo-editor";

loadNodeLib(editorId, LogicNodesStandard);
loadNodeLib(editorId, LogicNodesString);

const myLogicInterface = {
    inputs: {
        in_exec: { name: "", schema: LogicType.exec() },
        in_A: { name: "A", schema: LogicType.number() },
        in_B: { name: "B", schema: LogicType.boolean() }
    },
    outputs: {
        out_exec: { name: "", schema: LogicType.exec() },
        out_C: { name: "C", schema: LogicType.number() },
        out_D: { name: "D", schema: LogicType.string() }
    }
} satisfies TLogicInterface;

const myLogic = loadStandaloneLogic(myLogicInterface, editorId);
const caller = getStandaloneCaller(myLogic, "out_exec");

const lpEditor = new LpLogicEditor({ editorId });
const lpConsole = new LpEditorConsole({ editorId });

onMounted(() => {
    editorWrapper.value?.append(lpEditor);
    consoleWrapper.value?.append(lpConsole);
});

async function triggerLogic() {
    console.log(await caller({ in_A: 5, in_B: true }));
    console.log(await caller({ in_A: 2, in_B: false }));
}
</script>

<style scoped lang="scss">
.editor, .console {
    height: 400px;
}
</style>
