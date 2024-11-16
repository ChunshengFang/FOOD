import { Recipe } from '@/types'
import { Text } from '@radix-ui/themes'

export default ({ recipe }: { recipe: Recipe }) => {
  return (
    <div
      className='m-4 p-4 bg-sky-100 min-w-[100px] min-h-[200px]'
      key={recipe.id}
    >
      <a href={`/recipes/${recipe.id}`}>
        <img src={recipe.imageUrl} alt='' />
        <Text as='p' size='5' weight='bold'>
          {recipe.title}
        </Text>
        <br />
        <Text as='p' size='2' color='gray'>
          {recipe.description}
        </Text>
      </a>
    </div>
  )
}
