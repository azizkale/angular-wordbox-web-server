import jwtDecode from 'jwt-decode'
import User from '../../../models/User'

const createUser = async (_, { token }) => {
  const decoded = jwtDecode(JSON.parse(token).stsTokenManager.accessToken)

  const { email } = decoded
  const username = decoded.email.match(/^([^@]*)@/)[1]
  const userId = decoded.user_id

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
