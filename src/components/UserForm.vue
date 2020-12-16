<template>
  <form>
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="name" />

    <label for="newUserEmail">Email</label>
    <input type="email" id="newUserEmail" name="newUserEmail" v-model="email" />

    <label for="newUserPassword">Senha</label>
    <input
      type="password"
      id="newUserPassword"
      name="newUserPassword"
      v-model="password"
    />

    <label for="cep">Cep</label>
    <input type="text" id="cep" name="cep" v-model="cep" @keyup="fillCep" />

    <label for="street">Rua</label>
    <input type="text" id="street" name="street" v-model="street" />

    <label for="number">Número</label>
    <input type="text" id="number" name="number" v-model="number" />

    <label for="neighborhood">Bairro</label>
    <input
      type="text"
      id="neighborhood"
      name="neighborhood"
      v-model="neighborhood"
    />

    <label for="city">Cidade</label>
    <input type="text" id="city" name="city" v-model="city" />

    <label for="state">Estado</label>
    <input type="text" id="state" name="state" v-model="state" />

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "./../helpers.js";
import cepApi from "./../services/cepApi.js";

export default {
  name: "UserForm",

  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "street",
        "cep",
        "number",
        "neighborhood",
        "city",
        "state",
      ],
      base: "user",
      mutation: "UPDATE_USER",
    }),
  },

  methods: {
    fillCep() {
      const cep = this.cep.replace(/\D/g, "");

      if (cep.length === 8) {
        cepApi.get(`/${cep}/json`).then(({ data }) => {
          this.street = data.logradouro;
          this.neighborhood = data.bairro;
          this.state = data.uf;
          this.city = data.localidade;
        });
      }
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>