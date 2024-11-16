'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import AvatarComponent from './Avatar'

interface UserAvatarProps {
  name?: string
  email?: string
  avatarUrl?: string
  onLogout: () => void
}

const UserAvatar = ({
  name = 'User',
  email = 'user@example.com',
  avatarUrl = '',
  onLogout,
}: UserAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    setIsOpen(false)
    onLogout()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <AvatarComponent src={avatarUrl} alt={email} username={name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant='ghost'
            className='w-full justify-start'
            onClick={handleLogout}
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAvatar
