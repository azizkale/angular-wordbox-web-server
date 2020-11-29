import User from '../../../models/User'

const createUser = async (_, { email, password, username }) => {
  const user = new User({ email, password, username })
  await User.find({ email }, (error, data) => {
    if (!error && !data.length) {
      user.save()
    }
  })
  return user
}

export default createUser
