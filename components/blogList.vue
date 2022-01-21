<template>
    <ul class="blog-posts">
        <li v-for="post in posts" :key="post.id">
          <strong><router-link :to="`/blog/${post.uid}`">{{post.data.title[0].text}}</router-link></strong>
          <p>{{post.data.meta_description[0].text}}</p>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
} 
</script>
<style lang="scss">
.blog-posts {
  list-style-type: none;
  padding-left: 0;
  li {
    padding-left: $margin-xs;
    border-left: $margin-md solid $primary-color;
    margin-top: $margin-md
  }
}
</style>