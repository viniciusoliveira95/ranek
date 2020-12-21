<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <AddProduct />
    <h2>Seus Produtos</h2>
    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="(product, index) in userProducts" :key="index">
        <ProductItem :product="product">
          <p>{{ product.description }}</p>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

import AddProduct from "./../../components/AddProduct";
import ProductItem from "./../../components/ProductItem";

export default {
  name: "UserProducts",
  components: { AddProduct, ProductItem },
  computed: {
    ...mapState(["logged", "user", "userProducts"]),
  },

  methods: {
    ...mapActions(["getUserProducts"]),
  },

  watch: {
    logged() {
      this.getUserProducts();
    },
  },

  created() {
    if (this.logged) {
      this.getUserProducts();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
</style>