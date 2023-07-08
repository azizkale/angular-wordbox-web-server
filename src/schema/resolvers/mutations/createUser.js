import User from '../../../models/User.js'

const addShowCount = async (_, { userId, wordId }) => {
  try {
    const user = await User.findById(userId)
    const word = user.userwords.filter((wrd) => wrd.wordId === wordId)

    // if the word exist
    if (word.length) {
      word[0].showCount += 1
    }
    // if the word doesnt exist
    else {
      user.userwords.push({
        wordId,
        showCount: 1,
      })
    }
    await user.save()
    return user
  } catch (error) {
    return error.message
  }
}

export default addShowCount
