import User from '../../../models/User'

const createUser = async (_, { email, username }) => {
  const user = new User({ email, username })
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw Error('User exist!')
    }
    user.save()
    return user
  } catch (error) {
    console.log(error)
    return { status: 409, message: 'User exist!' }
  }
}

export default createUser
