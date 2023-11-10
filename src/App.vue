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
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.main-content {
  background-color: white;
}
</style>
