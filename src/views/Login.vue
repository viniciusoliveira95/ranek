<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.password"
      />
      <button class="btn" @click.prevent="doLogin">Logar</button>
      <ErrorNotification :errors="errors" />
    </form>
    <p class="lost_password">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui</a>
    </p>
    <CreateLogin />
  </section>
</template>

<script>
import CreateLogin from "./../components/CreateLogin.vue";

export default {
  name: "Login",
  components: {
    CreateLogin,
  },

  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },

  methods: {
    doLogin() {
      this.errors = [];

      this.$store
        .dispatch("getUser", this.login.email)
        .then(() => {
          this.$router.push({ name: "user" });
        })
        .catch((error) => {
          this.errors.push(error.response.statusText);
        });
    },
  },

  created() {
    document.title = "Login";
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.lost_password {
  text-align: center;
  margin: 20px auto 0 auto;
}

.lost_password a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>