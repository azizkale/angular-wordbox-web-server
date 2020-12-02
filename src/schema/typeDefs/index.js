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
    id: ID!
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
    listWords(voc: String, token: Boolean): [Word!]
    listUsers: [User!]
    glosbeWords(word: String!, from: String!, dest: String!): [GlosbeWord]
  }

  type Mutation {
    createWord(title: String!): Word!
    createUser(email: String!, username: String!): User!
    addShowCount(userId: ID!, wordId: ID!): User
  }
`

export default typeDefs
