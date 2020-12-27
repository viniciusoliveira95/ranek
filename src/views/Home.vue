<template>
  <section>
    <h1>👍 Compre ou venda 👎</h1>
    <ProductSearch />
    <ProductList />
  </section>
</template>

<script>
import ProductSearch from "../components/ProductSearch.vue";
import ProductList from "../components/ProductList.vue";

export default {
  name: "Home",
  components: { ProductSearch, ProductList },

  created() {
    document.title = "Ranek";
  },
};
</script>

<style  scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>