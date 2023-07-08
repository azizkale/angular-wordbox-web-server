import jwtDecode from 'jwt-decode'
import globeTranslate from './query/glosbeTranslate.js'
import createWord from './mutations/createWord.js'
import Word from '../../models/Word.js'
import User from '../../models/User.js'
import addShowCount from './mutations/showCount.js'
import createUser from './mutations/createUser.js'

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
    getSingleUser: async (_, { token }) => {
      if (JSON.parse(token) != null) {
        const decoded = jwtDecode(JSON.parse(token).stsTokenManager.accessToken)
        const user = await User.find({ userId: decoded.user_id })
        return user
      }
      return null
    },
    glosbeWords: globeTranslate,
  },
  Mutation: {
    createWord,
    createUser,
    addShowCount,
  },
}

export default resolvers
