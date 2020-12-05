import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type GlosbeWord {
    word: String!
    examples: [String]
  }

  type Details {
    id: Int
    vocabularyId: Int
    description: String
    sentenceMeaning: String
    language: Int
  }

  type Word {
    id: ID
    type: Int
    article: String
    word: String
    favorite: Boolean
    istOk: Int
    shown: Boolean
    showCount: Int
    group: Int
    photoUrl: String
    mineAdded: Boolean
    priorty: Int
    known: Boolean
    vocabularyDetail: [Details!]!
  }

  type User {
    userId: ID!
    email: String
    username: String
    password: String
    userwords: [Userword]
  }

  type Userword {
    wordId: ID
    showCount: Int
  }

  type Query {
    listWords(voc: String, token: String): [Word!]
    listUsers: [User!]
    getSingleUser(token: String!): [User]
    glosbeWords(word: String!, from: String!, dest: String!): [GlosbeWord]
  }

  type Mutation {
    createWord(title: String!): Word!
    createUser(token: String!): User!
    addShowCount(userId: ID!, wordId: ID!): User
  }
`

export default typeDefs
