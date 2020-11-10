import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type GlosbeWord {
    word: String!
    examples: [String]
  }

  type Word {
    id: ID!
    title: String!
  }

  type Query {
    localWords: [Word!]
    glosbeWords(word: String!, from: String!, dest: String!): [GlosbeWord]
  }

  type Mutation {
    createWord(title: String!): Word!
  }
`

export default typeDefs
