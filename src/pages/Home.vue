<script>
import TheFooter from "./components/TheFooter.vue";
import TheHeader from "./components/TheHeader.vue";
import RestaurantTypes from './components/RestaurantTypes.vue';


export default {
    components: {
        TheHeader,
        TheMain,
        TheFooter,
        RestaurantTypes,
    },
};
</script>

<template>
    <TheHeader></TheHeader>
    <RestaurantTypes />
    <TheFooter></TheFooter>
</template>

<style lang="scss" scoped></style>