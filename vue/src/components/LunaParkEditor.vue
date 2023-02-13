<template>
    <div class="editor-wrapper">
        <lp-tab-strip :editorId="editorId" class="tab-strip" standalone/>
        <lp-logic-editor :editorId="editorId" class="editor"/>
        <lp-console-panel :editorId="editorId" class="console"/>
        <lp-inspector-panel :editorId="editorId" class="inspector"/>
    </div>
</template>

<script lang="ts">
export default {
    name: "LunaParkEditor"
};
</script>

<script setup lang="ts">
import "luna-park";
import { editorId, getCaller, initEditor } from "@/lib";

initEditor();
getCaller();
</script>

<style scoped lang="scss">
.editor-wrapper {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 196px;
    grid-template-areas:
            "tabstrip tabstrip"
            "editor inspector"
            "console inspector";

    .editor {
        height: 320px;

        &::part(luna-park) {
            border-radius: 16px;
        }
    }

    .console, .inspector {
        border-radius: 16px;
        overflow: hidden;
        height: 160px;
        background: var(--color-background);
    }

    .editor {
        grid-area: editor;
    }

    .console {
        grid-area: console;
    }

    .tab-strip {
        grid-area: tabstrip;
    }

    .inspector {
        grid-area: inspector;
        height: 100%;
    }
}
</style>
