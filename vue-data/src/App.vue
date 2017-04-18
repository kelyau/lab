<template>
  <div id="app" class="layout">
    <Menu mode="horizontal" theme="dark" active-name="hello" class="layout-navbar">
      <div class="layout-opt">
        <router-link to="/login" v-show="!loggedIn"><Button type="success">登陆</Button></router-link>
        <router-link to="/signup" v-show="!loggedIn"><Button type="info">注册</Button></router-link>
        <Button v-show="loggedIn" type="info" @click="loginout()">退出</Button>
      </div>
      <div class="layout-logo"><img src="./assets/logo.png"></div>
      <div class="layout-nav">
        <Menu-item name="hello">
          <Icon type="ios-navigate"></Icon>
          <router-link to="/">Hello</router-link>
        </Menu-item>
        <Menu-item name="book">
          <Icon type="ios-keypad"></Icon>
          <router-link to="/book">Book</router-link>
        </Menu-item>
        <Menu-item name="note">
          <Icon type="ios-analytics"></Icon>
          <router-link to="/note">note</router-link>
        </Menu-item>
      </div>
    </Menu>
    <router-view class="layout-content"></router-view>
  </div>
</template>

<script>

import store from '@/store/';
import {} from './components/flex/';

export default {
  store,
  name: 'app',
  created() {
    this.$store.dispatch('initUser');
  },
  methods: {
    loginout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.replace('/login');
        });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style>
html,body {
  height: 100%;
  width: 100%;
  min-height: 380px;
  min-width: 680px;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.layout{
  background: #f5f7f9;
  height: 100%;
  width: 100%;
}
.layout-navbar {
  position: absolute!important;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-logo img {
  width: 20px;
  vertical-align: top;
  padding: 6px 0;
}
.layout-content{
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 70px 10px 10px 10px;
    z-index: 1;
}
.layout-opt {
  float: right;
  padding: 0 20px;
}
</style>
