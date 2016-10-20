const {
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql")
const db = require("../db")

const trackType = new GraphQLObjectType({
  name: "Track",
  description: "A track for the Jukebox to play",
  fields: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The URL of the track.",
    },
    id: {
      type: GraphQLInt,
      description: "The track identifier.",
    },
  },
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      tracks: {
        type: new GraphQLList(trackType),
        resolve: (rootValue) => {
          return db.track.read()
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      createTrack: {
        type: trackType,
        args: {
          url: {
            name: "url",
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (rootValue, args) => {
          return db.track.create(args)
        },
      },
    },
  }),
})
