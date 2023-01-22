<template>
    <div class="app">
        <lp-theme primary="#ffff00" tint="#101000"/>
        <div class="wrapper">
            <h1>Luna Park editor - Demo</h1>
            <LunaParkEditor/>
            <LunaParkLauncher/>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>

<script setup lang="ts">
import "luna-park";
import LunaParkEditor from "@/components/LunaParkEditor.vue";
import LunaParkLauncher from "@/components/LunaParkLauncher.vue";
</script>

<style scoped lang="scss">
.app {
    display: flex;
    flex-direction: column;
    align-items: center;

    .wrapper {
        width: 100%;
        max-width: 1200px;
    }
}
</style>
