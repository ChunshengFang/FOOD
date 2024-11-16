import http from '../lib/http'

const login = async ({
  login,
  password,
}: {
  login: string
  password: string
}) => {
  const res: any = await http.post('/api/users/login', { login, password })
  return res
}

const logout = async () => {}

type SignUpProps = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
// signup
const signup = async (data: SignUpProps) => {
  const { username, email, password, confirmPassword } = data
  console.log('object :>> ', username, email, password, confirmPassword)
  if (password !== confirmPassword) {
    console.error('Passwords do not match')
    return null
  }
  const res: any = await http.post('/api/users/register', {
    username,
    email,
    password,
  })

  return res
}

// get profile
const getProfile = async () => {
  const res: any = await http.get('/api/users/profile')
  console.log('getProfile res :>> ', res)
  if (res.status === 201) {
    // set localStorage
    localStorage.setItem('username', res.username)
    localStorage.setItem('userId', res.id)
    return res.data
  }
}

const searchUsers = async (keyword: string) => {
  const res: any = await http.get('/api/search/users?keyword='+keyword)
  return res
}

export { login, logout, signup, getProfile, searchUsers }
