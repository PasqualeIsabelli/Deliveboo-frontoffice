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
  <div class="main-content">
    <router-view />
  </div>
  
  <TheFooter></TheFooter>
</template>

<style lang="scss">
.main-content {
  background-color: #41642e;
  background-image: linear-gradient(180deg, #41642e 75%, #4e7738 92%, #4e7738 100%);
}
</style>
