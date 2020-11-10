import globeTranslate from './query/glosbeTranslate'
import createWord from './mutations/createWord'
import Word from '../../models/Word'

const resolvers = {
  Query: {
    localWords: () => Word.find(),
    glosbeWords: globeTranslate,
  },
  Mutation: {
    createWord,
  },
}

export default resolvers
