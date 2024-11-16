import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Recipe } from '@/types'
import { useEffect, useState } from 'react'

import { getTrendingRecipes } from '@/api/recipes'
type Item = {
  rating: number
  recipe: Recipe
}
export const TrendingRecipes = () => {
  const [items, setItems] = useState<Recipe[]>([])
  useEffect(() => {
    const fetchItems = async () => {
      const data: Item[] = await getTrendingRecipes()
      setItems(data.map(({ recipe }) => recipe))
    }

    fetchItems()
  }, [])
  return (
    <section id='TrendingRecipes' className='container py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        Top
        <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>
          {' '}
          Trending{' '}
        </span>
        Recipes
      </h2>

      <p className='text-xl text-muted-foreground pt-4 pb-8'>
        Most Rating Recipes.
      </p>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6'>
        {items.map(({ id, title, user, imageUrl }) => (
          <Card
            key={id}
            className='max-w-md md:break-inside-avoid overflow-hidden'
          >
            <CardHeader className='flex flex-row items-center gap-4 pb-2'>
              <Avatar>
                <AvatarImage alt='' src={imageUrl} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>

              <div className='flex flex-col m-b-4'>
                <CardTitle className='text-lg'>{title}</CardTitle>
                <CardDescription>{user?.name}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>{}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
