<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";


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
