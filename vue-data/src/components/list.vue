<template>
    <ul>
      <li v-for="book in books">
        <router-link :to="{name:'book', params: {id: book.id}}">{{book.title}}</router-link>
      </li>
    </ul>
</template>

<style></style>

<script>
  export default {
    props: ['books'],
  };
</script>
