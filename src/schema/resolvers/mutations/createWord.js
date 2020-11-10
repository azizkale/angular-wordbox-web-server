import Word from '../../../models/Word'

const createWord = async (_, { title }) => {
  const word = new Word({ title })
  await word.save()
  return word
}

export default createWord
