<template>
  <div id="app">
    <ExtensionComponent />
  </div>
</template>

<script>
import ExtensionComponent from './components/ExtensionComponent.vue';


export default {
  name: "App",
  components: {
    ExtensionComponent,
  },
};
</script>


<style>
@import "./scss/extension.css";
</style>