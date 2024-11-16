import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { buttonVariants } from './ui/button'
import { LogoIcon } from './Icons'
import { NavLink } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import { useStore } from '@/store'
import { useEffect } from 'react'
interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '/#',
    label: 'Home',
  },
  {
    href: '/recipe',
    label: 'Recipe',
  },
  {
    href: '/discovery',
    label: 'Discovery',
  },
  {
    href: '/nutrition',
    label: 'Nutrition',
  },
]

export const Navbar = () => {
  const { isLogin, user, logout } = useStore()

  useEffect(() => {
    if (!isLogin || !user) {
      logout()
    }
  }, [isLogin, user])

  return (
    <header className='sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container h-14 px-4 w-screen flex justify-between '>
          <NavigationMenuItem className='font-bold flex'>
            <a
              rel='noreferrer noopener'
              href='/'
              className='ml-2 font-bold text-xl flex'
            >
              <LogoIcon />
              RecipeShare
            </a>
          </NavigationMenuItem>

          {/* desktop */}
          <nav className='md:flex gap-2'>
            {routeList.map((route: RouteProps, i) => (
              <NavLink
                key={i}
                className={[
                  `text-[17px] ${buttonVariants({
                    variant: 'ghost',
                  })}`,
                  ({ isActive, isPending }: any) =>
                    isActive ? 'active' : isPending ? 'pending' : '',
                ].join(' ')}
                to={route.href}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
          {isLogin ? (
            <>
              <UserAvatar
                name={user?.username || ''}
                email={user?.email || ''}
                avatarUrl={
                  user?.avatarUrl ||
                  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
                }
                onLogout={() => {
                  console.log('logout :>> ')
                  logout()
                }}
              />
            </>
          ) : (
            <>
              <a href='/login' className='text-sm ml-2'>
                Sign Up / Login
              </a>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {/* avatar or signup / login */}
    </header>
  )
}
