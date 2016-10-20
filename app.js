const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const graphqlHTTP = require("express-graphql")
const schema = require("./graphql")

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack
  })
}))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
