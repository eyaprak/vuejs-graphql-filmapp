<template>
    <MovieList :loading="loading" :result="result?.books" :error="error" />
</template>


<script>
import MovieList from "../components/MovieList.vue";

export default {
  components: {
    MovieList,
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>