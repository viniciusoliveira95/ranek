<template>
  <section>
    <div v-if="buys">
      <h2>Compras</h2>
      <div class="products-wrapper" v-for="(buy, index) in buys" :key="index">
        <ProductItem v-if="buy.product" :product="buy.product">
          <p class="seller"><span>Vendedor:</span> {{ buy.sellerId }}</p>
        </ProductItem>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import ProductItem from "./../../components/ProductItem";
import api from "./../../services/api";

export default {
  name: "UserBuy",
  components: {
    ProductItem,
  },

  data() {
    return {
      buys: null,
    };
  },

  computed: {
    ...mapState(["user", "logged"]),
  },

  methods: {
    getBuys() {
      api
        .get(`/transaction?buyerId=${this.user.id}`)
        .then(({ data }) => (this.buys = data));
    },
  },

  watch: {
    logged() {
      this.getBuys();
    },
  },

  created() {
    if (this.logged) {
      this.getBuys();
    }

    document.title = "Usuário | Compras";
  },
};
</script>

<style scopped>
.productd-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>