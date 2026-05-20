import { apiClient } from './apiClient'

const pickErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Unable to sign in.'

export const loginWithEmail = async (email, password) => {
  try {
    const { data } = await apiClient.get('/users/filter', {
      params: { key: 'email', value: email },
    })
    const user = data?.users?.[0]

    if (!user?.username) {
      throw new Error('No account found for this email.')
    }

    const loginResponse = await apiClient.post('/auth/login', {
      username: user.username,
      password,
    })

    const token = loginResponse?.data?.token || loginResponse?.data?.accessToken
    if (!token) {
      throw new Error('Login did not return a token.')
    }

    return {
      token,
      user: loginResponse.data,
    }
  } catch (error) {
    throw new Error(pickErrorMessage(error))
  }
}
