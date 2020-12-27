<template>
  <div>
    <h1>Página não encontrada.</h1>
    <router-link class="home" to="/">Voltar para Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
h1 {
  margin: 40px auto;
  text-align: center;
  color: #87f;
}

.home {
  display: block;
  text-align: center;
}
</style>