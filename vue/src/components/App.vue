<template>
    <div class="app" ref="app">
        App
    </div>
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>

<script setup lang="ts">

import { LPFunctionEditor, loadApplication, loadNodeLib } from "@luna-park/integration";
import { onMounted, ref } from "vue";
import {LogicNodes as LogicNodesStandard} from "@luna-park/lib-standard"
import {LogicNodes as LogicNodesString} from "@luna-park/lib-string"

const app = ref();

onMounted(() => {
    loadApplication();
    loadNodeLib("demo", LogicNodesStandard)
    loadNodeLib("demo", LogicNodesString)
    const editor = new LPFunctionEditor({ editorId: "demo", standalone: true });
    app.value.append(editor);
});
</script>

<style scoped lang="scss">
.app {
    height: 400px;
}
</style>
