/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wMsqGIsbHKt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { login as httpLogin } from '../api/auth'

import { useStore } from '@/store'

const Login = () => {
  const [login, setLogin] = useState('admin')
  const [password, setPassword] = useState('123456')

  const { count, isLogin, user, inc, setIsLogin, setUser } = useStore()
  console.log(
    '[useStore] count, isLogin, user, inc :>> ',
    count,
    isLogin,
    user,
    inc
  )

  const onLogin = async () => {
    const data = await httpLogin({
      login,
      password,
    })
    if (data && data.user) {
      setUser(data.user)
      setIsLogin(true)
      window.location.replace('/')
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4'>
      <Card className='w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-md dark:bg-gray-800'>
        <CardContent className='p-6 md:p-8 space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome to RecipeShare</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Login your account
            </p>
          </div>
          <div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='login'>Email or Name</Label>
                <Input
                  id='login'
                  type='text'
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder='john@example.com or john'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type='submit' onClick={onLogin} className='w-full'>
                Login
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Create an account?{' '}
              <Link to='/signup' className='underline'>
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
