<script>
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";


export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<template>
  <TheHeader></TheHeader>

  <!-- rotta alla pagina -->
  <main>
    <router-view />
  </main>

  <TheFooter></TheFooter>
</template>

<style lang="scss"></style>
