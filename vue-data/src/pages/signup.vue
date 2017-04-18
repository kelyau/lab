<template>
  <div>
    <div class="signup">
      <Input type="text" v-model="user.username" placeholder="username" />
      <Input type="text" v-model="user.password" placeholder="password" />
      <Input type="text" v-model="user.email" placeholder="email" />
      <Button type="success" @click="signup()">注册</Button>
      <Button @click="cancel()">取消</Button>
    </div>
  </div>
</template>

<style>
  .signup {
    width: 380px;
    margin: 100px auto;
    text-align: center;
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
    signup() {
      this.$store.dispatch('signup', this.user).then(() => {
        this.$router.replace('/');
      });
    },
    cancel() {
      this.$router.replace('/login');
    },
  },
};
</script>
