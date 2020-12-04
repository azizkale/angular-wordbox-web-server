import jwtDecode from 'jwt-decode'
import globeTranslate from './query/glosbeTranslate'
import createWord from './mutations/createWord'
import Word from '../../models/Word'
import User from '../../models/User'
import addShowCount from './mutations/showCount'
import createUser from './mutations/createUser'

const resolvers = {
  Query: {
    listWords: async (_, { voc, token }) => {
      const arrayUserWordsIds = []
      if (JSON.parse(token) != null) {
        const decoded = jwtDecode(JSON.parse(token).stsTokenManager.accessToken)

        const user = await User.find({ email: decoded.email })

        user[0].userwords.map((w) => {
          return arrayUserWordsIds.push(w.wordId)
        })

        // gets the word from userwords which includes voc
        const wrd = await Word.find({
          _id: arrayUserWordsIds,
          word: { $regex: voc },
        })

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
