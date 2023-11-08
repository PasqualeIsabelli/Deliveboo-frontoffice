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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #02CCBC;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.9), 0 0px 2px rgba(0, 0, 0, 0.9);
    z-index: 1;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .main-content {
    margin-top: 103.6px;
    margin-bottom: 345.6px;
  }
</style>
