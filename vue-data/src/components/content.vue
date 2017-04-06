<template>
  <Card>
    <p slot="title">{{book.title}}</p>  
    <p slot="extra">{{book.summary}}</p>
    <em v-for="tag in book.tags">{{tag.name}}&nbsp;</em>
    <br>
    <img :src="book.image" />
  </Card>
</template>

<style></style>

<script>
  export default {
    props: ['book'],
  };
</script>
