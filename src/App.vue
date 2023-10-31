<script>
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import TheMain from "./components/TheMain.vue";

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
};
</script>

<template>
  <TheHeader></TheHeader>
  <TheMain></TheMain>
  <TheFooter></TheFooter>
</template>

<style lang="scss"></style>
