<template>
    <div class="luna-park-launcher">
        <div class="inputs">
            <div>Input A : <input type="text" v-model="inputA"/></div>
            <div>Input B : <input type="text" v-model="inputB"/></div>

            <div class="button-wrapper">
                <button @click="triggerLogic">Launch</button>
                <button @click="saveLogic">Save<span class="description">(local storage)</span></button>
                <button @click="loadLogic">Load<span class="description">(local storage)</span></button>
            </div>
        </div>
        <div class="inputs_pre">
            Inputs:
            <pre>{{ callerInput }}</pre>
        </div>
        <div class="inputs_pre">
            Outputs:
            <pre>{{ callerOutput }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "LunaParkLauncher"
};
</script>

<script setup lang="ts">
import { getCaller, loadLogic, saveLogic } from "@/lib";
import { computed, ref } from "vue";

const inputA = ref(5);
const inputB = ref("Hello world!");

const callerInput = computed(() => ({ in_A: inputA.value, in_B: inputB.value }));
const callerOutput = ref();

async function triggerLogic() {
    const caller = getCaller();
    callerOutput.value = await caller(callerInput.value);
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

        input {
            width: 128px;
        }
    }

    .button-wrapper {
        display: flex;
        gap: 4px;

        button {
            flex-grow: 1;
            flex-basis: 33%;

            .description {
                display: block;
                font-size: 0.6rem;
            }
        }
    }

    pre {
        margin: 0;
    }
}
</style>
