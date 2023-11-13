<script>
export default {

}
</script>


<template>
  <section class="dots-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </section>
</template>


<style lang="scss" scoped>
.dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 200px 0;
}

.dot {
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #dbd5af;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
  margin-right: 0;
}

.dot:nth-child(1) {
  animation-delay: -0.3s;
}

.dot:nth-child(2) {
  animation-delay: -0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: #dbd5af;
    box-shadow: 0 0 0 0 rgba(219, 213, 175, 0.7); /* Box shadow dello stesso colore */
  }

  50% {
    transform: scale(1.2);
    background-color: hsl(60, 60%, 70%);
    box-shadow: 0 0 0 10px rgba(219, 213, 175, 0); /* Box shadow più chiaro */
  }

  100% {
    transform: scale(0.8);
    background-color: #dbd5af;
    box-shadow: 0 0 0 0 rgba(219, 213, 175, 0.7); /* Ritorno al box shadow originale */
  }
}
</style>