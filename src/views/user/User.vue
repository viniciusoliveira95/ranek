<template>
  <section class="user">
    <nav class="sideNav">
      <ul>
        <li>
          <router-link :to="{ name: 'user' }">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'buys' }">Compras</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'sales' }">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user-edit' }">Editar Usuário</router-link>
        </li>
        <li>
          <button @click.prevent="logout">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "User",

  methods: {
    logout() {
      this.$store.dispatch("userLogout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>