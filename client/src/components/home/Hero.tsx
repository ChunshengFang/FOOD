import { HeroCards } from './HeroCards'

export const Hero = () => {
  return (
    <section className='container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10'>
      <div className='text-center lg:text-start space-y-6'>
        <main className='text-5xl md:text-6xl font-bold'>
          <h1 className='inline'>
            <span className='inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text'>
              Recipe Share
            </span>{' '}
            Share and Discovery, eat more .
          </h1>{' '}
          for{' '}
          <h2 className='inline'>
            <span className='inline bg-gradient-to-r from-[#70fb61] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text'>
              healthy
            </span>{' '}
            Food
          </h2>
        </main>
      </div>

      {/* Hero cards sections */}
      <div className='z-10'>
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className='shadow'></div>
    </section>
  )
}
