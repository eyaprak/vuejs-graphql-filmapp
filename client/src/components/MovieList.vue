<template>
  <div class="hello">
    <h3 class="parent-title">MOVIE LIST</h3>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div v-else class="movie-wrapper">
      <MovieItem :result="result.films" />
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const FILM_QUERY = gql`
  {
    films {
      id
      title
      poster_path
      vote_average
    }
  }
`;

export default {
  name: "MovieList",
  setup() {
    const { result, loading, error } = useQuery(FILM_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
  components: {
    MovieItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parent-title {
  font-size: 24px;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #a30973;
}
.movie-list {
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 40px;
  padding-left: 0px;
}
</style>
