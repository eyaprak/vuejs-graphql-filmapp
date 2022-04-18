<template>
<ul class="movie-list">
   <li v-for="film in result" :key="film.id" class="movie-item">
     <router-link :to="'/movie/'+film.id">
      <img v-bind:src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + film.poster_path" /> 
     </router-link>
   <p class="title">{{film.title}}</p>
   <router-link :to="'/movie/'+film.id" class="readmore-button">Read More</router-link>
   </li>
</ul>
</template>



<script>
export default {
   name: 'MovieItem',
   props: {
    result: Array,
  },
}
</script>


<style>
.movie-item {
  border: 2px solid rgba(231, 231, 231, 0.486);
  width:100%;
  padding:10px;
  font-family: 'Lato', sans-serif;
}
.movie-item img{
  max-width:400px;
  max-height:400px;
}
.movie-item .title{
  font-size:16px;
  font-weight:bold;
  color: #a30973;
}
.movie-item .readmore-button{
  background: #a30973;
  color: white;
  padding:10px;
  display:inline-block;
  text-decoration: none;
}


</style>