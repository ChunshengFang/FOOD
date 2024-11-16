import { useLoaderData } from 'react-router-dom'
import { getRecipe } from '@/api/recipes'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Box, Card } from '@radix-ui/themes'
import NutritionDetail from '@/components/NutritionDetail'
import RatingReview from '@/components/RatingReview'

export async function loader({ params }: any) {
  const recipe = await getRecipe(params.id)
  return { recipe }
}

export default function RecipeDetail() {
  const { recipe } = useLoaderData() as any
  return (
    <div className='flex flex-col m-auto items-center w-[600px] m-t-8 p-4'>
      <div className='text-left '>
        <p className='text-2xl mb-4'>{recipe.title}</p>
        <p className='flex-auto'>
          <Avatar>
            <AvatarImage
              className='h-10 w-10 rounded-full'
              alt=''
              src={recipe.author?.avatarUrl}
            />
          </Avatar>
          {recipe.author?.username}
        </p>
      </div>
      <div className='flex flex-row justify-start gap-4 items-start border-2 border-slate-300 p-4'>
        <img className='w-1/3' src={recipe.imageUrl} alt='' />
        <p className='w-2/3'>{recipe.description}</p>
      </div>
      <div className='flex flex-row p-4 gap-4 justify-start items-start'>
        <Box>
          <Card>
            <p className='text-lg'>Ingredients:</p>
            <ul>
              {recipe.ingredients.map((ingredient: any) => (
                <li key={ingredient.foodId}>
                  {ingredient.description} ({ingredient.amount}
                  {ingredient.unit})
                </li>
              ))}
            </ul>
          </Card>
          <NutritionDetail recipeId={recipe.id} />
        </Box>
        <Box>
          <RatingReview recipeId={recipe.id} />
        </Box>
      </div>
    </div>
  )
}
