import globeTranslate from './query/glosbeTranslate'
import createWord from './mutations/createWord'
import Word from '../../models/Word'
import User from '../../models/User'
import addShowCount from './mutations/showCount'
import createUser from './mutations/createUser'

const resolvers = {
  Query: {
    listWords: async (_, { voc, token }) => {
      if (JSON.parse(token) != null) {
        const wrd = await Word.find({ word: voc })
        return wrd
      }
      return null
    },
    listUsers: () => User.find(),
    glosbeWords: globeTranslate,
  },
  Mutation: {
    createWord,
    createUser,
    addShowCount,
  },
}

export default resolvers
