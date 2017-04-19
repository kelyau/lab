<template>
<div>
  <h2>{{data.title}}</h2>
  <h6>{{data.date}}</h6>
  <p><span v-for="tag in data.tags">{{tag}}&nbsp;</span></p>
  <div>{{data.text}}</div>
</div>
</template>

<style>
</style>

<script>
export default {
  props: ['data'],
};
</script>
