<script>
import TheHeader from "../components/TheHeader.vue";
import RestaurantTypes from '../components/RestaurantTypes.vue';
import TheFooter from "../components/TheFooter.vue";


export default {
    components: {
        TheHeader,
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