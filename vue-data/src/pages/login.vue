<template>
  <div class="login">
    <Input type="text" v-model="user.username" placeholder="username" />
    <Input type="text" v-model="user.password" placeholder="password" />
    <Button type="success" @click="login()">登录</Button>
  </div>
</template>

<style>
  .login {
    width: 380px;
    margin: 100px auto;
  }
</style>

<script>
export default{
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.user)
        .then(() => {
          this.$router.replace('/');
        });
    },
  },
};
</script>
