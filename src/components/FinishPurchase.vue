<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finishPurchase">
        Finalizar Compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import { mapState } from "vuex";

import UserForm from "./../components/UserForm";
import api from "./../services/api";

export default {
  name: "FinishPurchase",
  components: { UserForm },
  props: ["product"],
  computed: {
    ...mapState(["user"]),

    purchase() {
      return {
        buyerId: this.user.email,
        sellerId: this.product.userId,
        product: this.product,
        address: {
          cep: this.user.cep,
          street: this.user.street,
          number: this.user.number,
          neighborhood: this.user.neighborhood,
          city: this.user.city,
          state: this.user.state,
        },
      };
    },
  },

  methods: {
    createTransaction() {
      return api
        .post("/transaction", this.purchase)
        .then(() => this.$router.push({ name: "buys" }));
    },

    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        await this.createTransaction();
      } catch (error) {
        console.log(error);
      }
    },

    finishPurchase() {
      if (this.$store.state.logged) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>