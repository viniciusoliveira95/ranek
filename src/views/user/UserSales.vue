<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
        <ProductItem v-if="sale.product" :product="sale.product">
          <p class="seller"><span>Comprador:</span> {{ sale.buyerId }}</p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="sale.address">
            <li v-for="(value, key) in sale.address" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import ProductItem from "./../../components/ProductItem";
import api from "./../../services/api";

export default {
  name: "UserSales",
  components: {
    ProductItem,
  },

  data() {
    return {
      sales: null,
    };
  },

  computed: {
    ...mapState(["user", "logged"]),
  },

  methods: {
    getSales() {
      api
        .get(`/transaction?sellerId=${this.user.id}`)
        .then(({ data }) => (this.sales = data));
    },
  },

  watch: {
    logged() {
      this.getSales();
    },
  },

  created() {
    if (this.logged) {
      this.getSales();
    }
  },
};
</script>

<style scopped>
h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  justify-self: end;
}

.productd-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #e80;
}

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}
</style>