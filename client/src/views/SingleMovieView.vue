<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <p v-if="loading">loading...</p>
    <span v-else-if="result?.film !== undefined">
      <div class="content-wrapper">
        <router-link to="/" class="go-back-button"> Go Back </router-link>
        <div class="left-side">
          <img
            v-bind:src="
              'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
              result.film.poster_path
            "
          />
        </div>
        <div class="right-side">
          <h4 class="title">{{ result.film.title }}</h4>
          <p class="description">
            {{ result.film.overview }}
          </p>
          <div class="production-companies">
            <ul class="companies-list">
              <li
                v-for="company in removeNullItem"
                :key="company.id"
                class="companies-list-item"
              >
                <template v-if="company.logo_path !== null">
                  <img
                    v-bind:src="
                      'https://image.tmdb.org/t/p/w500/' + company.logo_path
                    "
                  />
                </template>
              </li>
            </ul>
          </div>
          <transition name="fade">
            <a
              v-bind:href="result.film.homepage"
              class="watch-film-button"
              target="_blank"
            >
              Watch The Film
            </a>
          </transition>
        </div>
      </div>
    </span>
    <span v-else>The film couldn't be found.</span>
  </div>
</template>



<script>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const FilmQueryFunc = (id) => {
  return gql`
    { 
        film(id: ${id}){ 
        id
        title
        overview
        poster_path
        vote_average 
        homepage
        production_companies{
            id
            name
            logo_path
        }
    }
    }
    `;
};

export default {
  name: "SingleMovieView",
  props: ["filmId"],
  setup(props) {
    const { result, loading, error } = useQuery(FilmQueryFunc(props.filmId));
    return {
      result,
      loading,
      error,
    };
  },
  computed: {
    removeNullItem: function () {
      return this.result.film.production_companies
        .filter((film) => film.logo_path !== null)
        .slice(0, 4);
    },
  },
};
</script>



<style>
.content-wrapper {
  display: flex;
  margin-top: 80px;
  border: 2px solid #a30973;
  position: relative;
}
.content-wrapper img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.content-wrapper .left-side {
  flex: 2;
  margin-left: 3px;
}
.content-wrapper .right-side {
  flex: 4;
  margin-left: 10px;
  text-align: left;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.content-wrapper .right-side .title {
  font-size: 30px;
  font-family: "Roboto", sans-serif;
  margin-top: 0px;
  color: #a30973;
  letter-spacing: 0.8px;
}
.content-wrapper .right-side .description {
  font-size: 18px;
  font-family: "Loto", sans-serif;
  color: #2a2828;
}
.content-wrapper .right-side .companies-list {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  /*grid-template-columns: repeat(5, auto);*/
  flex-wrap: wrap;
  list-style-type: none;
  padding-left: 0px;
  gap: 30px;
}
.content-wrapper .right-side img {
  width: 200px;
  height: 50px;
  padding: 5px 10px;
  border: 2px solid #eee;
}
.right-side .watch-film-button,
.go-back-button {
  text-decoration: none;
  border: 1px solid #a30973;
  color: #a30973;
  transition: 300ms all;
  padding: 20px 20px;
  display: inline-block;
  margin-top: auto;
  font-size: 22px;
  font-weight: bold;
  font-family: "Loto", sans-serif;
  text-align: center;
}
.right-side .watch-film-button:hover,
.go-back-button:hover {
  background: #a30973;
  color: white;
}
.go-back-button {
  position: absolute;
  top: -60px;
  left: 0px;
  padding: 10px;
}
</style>