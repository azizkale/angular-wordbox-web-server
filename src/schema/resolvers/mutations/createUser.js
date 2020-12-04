import User from '../../../models/User'

const createUser = async (_, { email, username, userId }) => {
  const user = new User({ email, username, userId })
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw Error('User exist!')
    }
    user.save()
    return user
  } catch (error) {
    return { status: 409, message: 'User exist!' }
  }
}

export default createUser
