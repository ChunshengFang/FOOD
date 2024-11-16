import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from '../Icons'

interface FeatureProps {
  icon: JSX.Element
  title: string
  description: string
}

const TargetAudience: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: 'Personalized Feeds',
    description:
      'Offer customized recipe suggestions based on user preferences and dietary restrictions.',
  },
  {
    icon: <MapIcon />,
    title: 'Nutrition Integration',
    description:
      'Provide detailed nutritional information by integrating with external nutrition APIs.',
  },
  {
    icon: <PlaneIcon />,
    title: 'Community Engagement',
    description:
      ' Encourage users to form connections through the comment section, giving likes & saving the recipe would bump the recipe up for more exposure',
  },
  {
    icon: <GiftIcon />,
    title: 'Global Diversity',
    description:
      'Highlight international cuisines by featuring recipes from various cultures, promoting culinary diversity.',
  },
]

export const HowItWorks = () => {
  return (
    <section id='howItWorks' className='container text-center py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold '>
        How It{' '}
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          Works{' '}
        </span>
      </h2>
      <p className='md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground'>
        we emphasizing social interaction and personalized experiences!
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {TargetAudience.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className='bg-muted/50'>
            <CardHeader>
              <CardTitle className='grid gap-4 place-items-center'>
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
