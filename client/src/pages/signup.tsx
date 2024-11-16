import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { signup } from '@/api/auth'
import { useState } from 'react'
const Signup = () => {
  const [password, setPassword] = useState('123456')
  const [username, setUername] = useState('test')
  const [email, setEmail] = useState('test@g.cn')
  const [confirmPassword, setConfirmPassword] = useState('123456')

  const onSignup = async (e: any) => {
    e.preventDefault()
    const res = await signup({ username, email, password, confirmPassword })
    console.log('onSignup', res)
    if (res && res.id) {
      alert('signup success, please login')
      window.location.href = '/login'
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screedn bg-gray-100 dark:bg-gray-900 p-4'>
      <Card className='w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-md dark:bg-gray-800'>
        <CardContent className='p-6 md:p-8 space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome to RecipeShare</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Create your account
            </p>
          </div>
          <div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='username'>username</Label>
                <Input
                  id='username'
                  placeholder='john'
                  value={username}
                  onChange={(e) => setUername(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='john@example.com'
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
              <div className='space-y-2'>
                <Label htmlFor='confirm-password'>Confirm Password</Label>
                <Input
                  id='confirm-password'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type='submit' onClick={onSignup} className='w-full'>
                Sign Up
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link to='/login' className='underline'>
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup
