<template>
    <ul>
      <li v-for="item in list" :class="{active: active === item[activeProp]}">
        <router-link :to="{name: name, params: {id: item[activeProp]}}">{{item.title}}</router-link>
      </li>
    </ul>
</template>

<style scoped>
  ul {
    padding: 10px 0;
  }
  li {
    text-align: left;
    padding: 5px 10px;
  }
  li.active {
    background: #efefef;
  }
</style>

<script>
  export default {
    props: ['list', 'active', 'activeProp', 'name'],
  };
</script>
