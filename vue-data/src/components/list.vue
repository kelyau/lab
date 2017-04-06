<template>
    <ul>
      <li v-for="book in books">
        <router-link :to="{name:'book', params: {id: book.id}}">{{book.title}}</router-link>
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
</style>

<script>
  export default {
    props: ['books'],
  };
</script>
