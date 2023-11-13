<script>
import RestaurantTypes from '../components/RestaurantTypes.vue';


export default {
    components: {
        RestaurantTypes,
    },
};
</script>

<template>
    <section class="jumbo"></section>
    <RestaurantTypes/>
</template>

<style lang="scss" scoped>
.jumbo {
    width: 100vw;
    height: 500px;
    background-image: url(../assets/images/jumbo.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
}
</style>