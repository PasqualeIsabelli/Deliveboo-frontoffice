<script>
export default {
  data() {
    return {
      creditsList: [
        {
          title: 'Chi siamo',
          credits: ['Il nostro personale', 'I nostri partner', 'Contattaci', 'Blog'],
        },
        {
          title: 'Servizio Clienti & FAQ',
          credits: ['Domande frequenti', 'Metodi di pagamento', 'Registra il tuo ristorante', 'Accedi'],
        },
        {
          title: 'Seguici su',
          credits: ['Facebook', 'Instagram', 'Pinterest', 'Twitter'],
        },
        {
          title: 'Download',
          credits: ['Scarica la nostra app'],
        },
        {
          title: 'Diritti e Privacy',
          credits: ['Politiche del sito', 'Termini e condizioni d\'uso', 'Politica sui cookie', 'Politiche sulla privacy'],
        },
      ]
    }
  }
}
</script>

<template>
  <div class="container-fluid d-flex justify-content-center py-3">
    <div class="logo-container">
      <img style="width: 300px;" src="../assets/images/logo.png">
    </div>
    <div class="ul-container">
      <div class="d-flex justify-content-center gap-5">
        <ul class="m-0" v-for="singleCredit in creditsList">
          <h4 class="fw-bold">{{ singleCredit.title }}</h4>
          <li v-for="singleLink in singleCredit.credits" class="nav-item list-unstyled"><a class="nav-link" href="#0">{{ singleLink }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(149, 157, 165, 0.2) 0px -8px 24px;
}
</style>
