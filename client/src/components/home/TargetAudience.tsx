import { Badge } from '../ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import image from '@/assets/growth.png'
import image3 from '@/assets/reflecting.png'
import image4 from '@/assets/looking-ahead.png'

interface FeatureProps {
  title: string
  description: string
  image: string
}

const items: FeatureProps[] = [
  {
    title: 'Home Cooks',
    description:
      'Individuals looking to discover new recipes and share their culinary creations for different cultural tastes.',
    image: image4,
  },
  {
    title: 'Food Enthusiasts',
    description:
      'Users interested in exploring global cuisines and learning new cooking techniques.',
    image: image3,
  },
  {
    title: 'Diet-Conscious Individuals',
    description:
      'People seeking recipes that align with specific dietary needs or health goals.',
    image: image,
  },
]

const featureList: string[] = ['No-Suger', 'Vegetable', 'Low-Carb', 'Vegan']

export const TargetAudience = () => {
  return (
    <section id='TargetAudience' className='container py-24 sm:py-32 space-y-8'>
      <h2 className='text-3xl lg:text-4xl font-bold md:text-center'>
        Target{' '}
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          Audience
        </span>
      </h2>

      <div className='flex flex-wrap md:justify-center gap-4'>
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant='secondary' className='text-sm'>
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {items.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt='About feature'
                className='w-[200px] lg:w-[300px] mx-auto'
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
