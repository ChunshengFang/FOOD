// gen corde
import { Box, Flex, Text, Card, Button, Badge } from '@radix-ui/themes'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { searchIngredients, fetchAllFoods } from '@/api/nutrition'

const Nutrition = () => {
  const [ingredientName, setIngredientName] = useState('')
  const [items, setItems] = useState([])
  const [foods, setFoods] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // fetch foods
  const fetchFoods = async () => {
    const _foods = await fetchAllFoods()
    setFoods(_foods.items)
  }

  if (!isFetching) {
    setIsFetching(true)
    fetchFoods()
  }

  const onSearch = async () => {
    setIsSearching(true)
    const res = await searchIngredients(ingredientName)
    setItems(res.foodNutrients)
    setIsSearching(false)
    fetchFoods()
  }
  return (
    <div style={{ textAlign: 'center', paddingTop: '16px' }}>
      <h1>Search Food's Ingredients</h1>
      <br />
      <div className='flex justify-center  items-center'>
        <Input
          className='w-[200px] '
          type='text'
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder='Food Name'
        />
        &nbsp; &nbsp;
        <Button onClick={onSearch} disabled={isSearching}>
          <SearchIcon />
          <Text>Search Food</Text>
        </Button>
      </div>
      <Box
        style={{
          padding: '16px',
          display: items.length > 0 ? 'block' : 'none',
        }}
      >
        <Card>
          <ul>
            {items.map((nutrient: any) => (
              <li key={nutrient.nutrientId}>
                <Badge>{nutrient.nutrientName}</Badge>
                <Text as='span' size='2' className='underline m-2'>
                  {nutrient.value}
                </Text>
                {nutrient.unitName}
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              setItems([])
              setIngredientName('')
            }}
          >
            X
          </Button>
        </Card>
      </Box>
      <br />
      <hr />
      <br />
      <h2>All Foods</h2>
      <Flex gap='3' style={{ padding: '16px' }} className='flex-wrap'>
        {foods.map((food: any) => (
          <Box
            width='400px'
            height={'500px'}
            overflow={'scroll'}
            key={food.fdcId}
          >
            <Card size='2'>
              <Flex gap='4' align='center'>
                <Box>
                  <Text as='div' weight='bold'>
                    {food.description}
                  </Text>
                  <Text as='div' size='2' color='gray'>
                    <Badge>{food.foodCategory}</Badge>
                  </Text>
                  <Text as='div' color='gray'>
                    {food.ingredients}
                  </Text>
                  <hr />
                  <ul>
                    {food.foodNutrients.map((nutrient: any) => (
                      <li key={nutrient.nutrientId}>
                        <Badge>{nutrient.nutrientName}</Badge>
                        <Text as='span' size='2' className='underline m-2'>
                          {nutrient.value}
                        </Text>
                        {nutrient.unitName}
                      </li>
                    ))}
                  </ul>
                </Box>
              </Flex>
            </Card>
          </Box>
        ))}
      </Flex>
    </div>
  )
}

export default Nutrition
