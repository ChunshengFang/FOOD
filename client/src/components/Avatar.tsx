import * as Avatar from '@radix-ui/react-avatar'

const AvatarComponent = ({
  username = '',
  src = '',
  alt = '',
  delayMs = 600,
}) => {
  return (
    <div className='flex gap-5'>
      <Avatar.Root
        className={
          'inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle'
        }
      >
        <Avatar.Image
          className='size-full rounded-[inherit] object-cover'
          src={src}
          alt={alt}
        />
        <Avatar.Fallback
          className='leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11'
          delayMs={delayMs}
        >
          {username}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}

export default AvatarComponent
