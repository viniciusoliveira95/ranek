<template>
  <section class="produtcts-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div class="product" v-for="(product, index) in products" :key="index">
          <router-link to="/">
            <img
              v-if="product.photos"
              :src="product.photos[0].src"
              alt="product.photos[0].title"
            />
            <p class="price">{{ product.price }}</p>
            <h2 class="title">{{ product.name }}</h2>
            <p>{{ product.description }}</p>
          </router-link>
        </div>
        <ProductsPagination :count="count" :perPage="perPage" />
      </div>
      <div v-else-if="products && products.length === 0" key="no-results">
        <p class="no-results">Busca sem resultados. Tente buscar outro termo</p>
      </div>
      <PageLoading v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import ProductsPagination from "./ProductsPagination.vue";
import api from "./../services/api.js";
import { serialize } from "./../helpers.js";

export default {
  name: "ProductList",

  components: {
    ProductsPagination,
  },

  data() {
    return {
      products: null,
      perPage: 9,
      count: 0,
    };
  },

  computed: {
    url() {
      return `/product?_limit=${this.perPage}${serialize(this.$route.query)}`;
    },
  },

  watch: {
    url() {
      this.getProducts();
    },
  },

  methods: {
    getProducts() {
      this.products = null;
      setTimeout(() => {
        api.get(this.url).then((response) => {
          this.count = Number(response.headers["x-total-count"]);
          this.products = response.data;
        });
      }, 1500);
    },
  },

  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.produtcts-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 5px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e809;
  font-weight: bold;
}

.no-results {
  text-align: center;
}
</style>