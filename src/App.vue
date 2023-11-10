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
  <div class="navbar">
    <TheHeader></TheHeader>
  </div>

  <!-- Questo è il punto in cui il componente corrispondente alla route corrente verrà renderizzato -->
  <div class="main-content">
    <router-view />
  </div>

  <div class="footer">
    <TheFooter></TheFooter>
  </div>
</template>

<style lang="scss">
  .navbar {
    width: 100%;
    background-color: #02CCBC;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.9), 0 0px 2px rgba(0, 0, 0, 0.9);
  }

</style>
