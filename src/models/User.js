import mongoose from 'mongoose'

const User = {
  userId: String,
  email: String,
  username: String,
  password: String,
  userwords: [
    {
      wordId: String,
      showCount: Number,
    },
  ],
}

export default mongoose.model('Users', User)
