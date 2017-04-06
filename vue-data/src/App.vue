<template>
  <div id="app" class="layout">
    <Menu mode="horizontal" theme="dark" active-name="hello">
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
        <Menu-item name="news">
          <Icon type="ios-analytics"></Icon>
          <router-link to="/news">News</router-link>
        </Menu-item>
      </div>
    </Menu>
    <router-view class="layout-container"></router-view>
  </div>
</template>

<script>

import store from '@/store/';

export default {
  store,
  name: 'app',
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
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
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
</style>
