import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import cubeLeg from '@/assets/cube-leg.png'

const items = [
  {
    title: 'How to bake for a cake sale',
    headingStyledSize: 4,
    showTitleIcon: false,
    showOverlayIcon: false,
    contentType: null,
    theme: null,
    id: '296254',
    label: null,
    kicker: null,
    postFormat: 'standard',
    rating: null,
    url: '/howto/guide/how-bake-cake-sale',
    isPremium: false,
    subscriptionExperience: 'default',
    image: {
      aspectRatio: 0.908730158730159,
      height: 400,
      width: 400,
      alt: 'Cherry bakewell buns joined together',
      title: 'Sticky cherry bakewell buns',
      url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/sticky_cherry_bakewell_buns400-904c81b.jpg',
    },
    postType: 'post',
    description: null,
    published: 'June 21, 2024 at 10:12 AM',
    authorName: 'Natalie Hardwick – Head of Digital Delivery, goodfood.com',
  },
  {
    title: 'The best coffee morning recipes',
    headingStyledSize: 4,
    showTitleIcon: false,
    showOverlayIcon: false,
    contentType: null,
    theme: null,
    id: '291513',
    label: null,
    kicker: null,
    postFormat: 'standard',
    rating: null,
    url: '/howto/guide/coffee-morning-recipes',
    isPremium: false,
    subscriptionExperience: 'default',
    image: {
      aspectRatio: 0.908730158730159,
      height: 836,
      width: 900,
      alt: 'Devonshire splits on a wire rack',
      title: 'Devonshire splits',
      url: 'https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Devonshire-splits-78dde87.jpg',
    },
    postType: 'post',
    description: null,
    published: 'June 19, 2024 at 4:16 PM',
    authorName: 'Georgina Kiely',
  },
  {
    title: 'The best Easter cakes for kids',
    headingStyledSize: 4,
    showTitleIcon: false,
    showOverlayIcon: false,
    contentType: null,
    theme: null,
    id: '331742',
    label: null,
    kicker: null,
    postFormat: 'standard',
    rating: null,
    url: '/howto/guide/best-easter-cakes-kids',
    isPremium: false,
    subscriptionExperience: 'default',
    image: {
      aspectRatio: 0.908730158730159,
      height: 3709,
      width: 3372,
      alt: 'Frosted white chocolate Easter cake',
      title: 'The best Easter cakes for kids',
      url: 'https://images.immediate.co.uk/production/volatile/sites/30/2023/03/The-best-Easter-cakes-for-kids-b2c724a.jpg',
    },
    postType: 'post',
    description: null,
    published: 'May 22, 2023 at 4:21 PM',
    authorName: 'Rachel Beckwith',
  },
]

export const Services = () => {
  return (
    <section className='container py-24 sm:py-32'>
      <div className='grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center'>
        <div>
          <h2 className='text-3xl md:text-4xl font-bold'>
            <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
              Top{' '}
            </span>
            Trending
          </h2>

          <p className='text-muted-foreground text-xl mt-4 mb-8 '>
            Most Rating Recipes.
          </p>

          <div className='flex flex-col gap-8'>
            {items.map(({ image, title, icon }: any) => (
              <Card key={title}>
                <CardHeader className='space-y-1 flex md:flex-row justify-start items-start gap-4'>
                  <div className='mt-1 bg-primary/20 p-1 rounded-2xl'>
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className='text-md mt-2'>
                      <img
                        src={image.url}
                        alt=''
                        style={{ width: '300px', height: '200px' }}
                      />
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={cubeLeg}
          className='w-[300px] md:w-[500px] lg:w-[600px] object-contain'
          alt='About services'
        />
      </div>
    </section>
  )
}
