<template>
    <div class="luna-park-launcher">
        <div class="inputs">
            <div>Input A : <input type="text" v-model="inputA"/></div>
            <div>Input B : <input type="text" v-model="inputB"/></div>

            <button @click="triggerLogic">Launch</button>
        </div>
        <div class="inputs_pre">
            Inputs:
            <pre>{{ callerInput }}</pre>
        </div>
        <div class="inputs_pre">
            Outputs:
            <pre>{{ callerOutputs }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "LunaParkLauncher"
};
</script>

<script setup lang="ts">
import { getCaller } from "@/lib";
import { computed, ref } from "vue";

const caller = getCaller();

const inputA = ref(5);
const inputB = ref("Hello world!");

const callerInput = computed(() => ({ in_A: inputA.value, in_B: inputB.value }));
const callerOutputs = ref();

async function triggerLogic() {
    callerOutputs.value = await caller(callerInput.value)
}
</script>

<style scoped lang="scss">
.luna-park-launcher {
    display: flex;
    gap: 16px;
    margin-top: 16px;

    & > * {
        background: var(--color-background);
        border-radius: 16px;
        padding: 8px;
        flex-grow: 1;
        flex-basis: 100%;
    }

    .inputs {
        display: flex;
        gap: 4px;
        flex-direction: column;

        input, button {
            width: 128px;
        }
    }

    pre {
        margin: 0;
    }
}
</style>
