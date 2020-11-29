import User from '../../../models/User'

const addShowCount = async (_, { userId, wordId }) => {
  await User.find({ _id: userId }, (error, data) => {
    // gets user
    data[0].userwords.map((word) => {
      // finds the word, which user studied
      if (word._id.equals(wordId)) {
        word.showCount += 1
      }
      User.findByIdAndUpdate(userId, { userwords: data[0].userwords })
      return word
    })
  })
}

export default addShowCount
