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

  <!-- Questo è il punto in cui il componente corrispondente alla route corrente verrà renderizzato -->
  <main>
    <router-view />
  </main>

  <TheFooter></TheFooter>
</template>

<style lang="scss"></style>
