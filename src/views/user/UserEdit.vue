<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "./../../components/UserForm";
import api from "./../../services/api";

export default {
  name: "UserEdit",
  components: { UserForm },

  methods: {
    updateUser() {
      api
        .put(`user/${this.$store.state.user.id}`, this.$store.state.user)
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "user" });
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    document.title = "Usuário | Editar";
  },
};
</script>

<style>
</style>