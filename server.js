const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
} = require('graphql');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

app.use(cors());

const ProductionCompaniesType = new GraphQLObjectType({
  name: 'productionCompanies',
  fields: () => ({
    id: { type: GraphQLInt },
    logo_path: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const FilmType = new GraphQLObjectType({
  name: 'Film',
  description: 'Film type object',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    overview: { type: new GraphQLNonNull(GraphQLString) },
    poster_path: { type: GraphQLString },
    vote_average: { type: new GraphQLNonNull(GraphQLFloat) },
    homepage: { type: GraphQLString},
    production_companies: { type: new GraphQLList(ProductionCompaniesType) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    films: {
      type: new GraphQLList(FilmType),
      resolve: async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=2`
        );
        return data.results;
      },
    },
    film: {
      type: FilmType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.API_KEY}&language=en-US`
        );
        return data;
      },
    },
  }),
});


const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log('Server is listening on 8000. port...');
});
