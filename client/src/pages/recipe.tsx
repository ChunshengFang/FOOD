// gen corde
// use axios to fetch data
// import { Card  } from '@/components/ui/card';
import { Text, Grid, Box, Container, Button } from '@radix-ui/themes'
import { getRecipes } from '@/api/recipes'

import { useState, useEffect } from 'react'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import RecipeCard from '@/components/recipe/RecipeCard'
const Recipe = () => {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    getRecipes().then((res: any) => {
      setRecipes(res.items)
    })
  }, [])
  return (
    <div style={{ textAlign: 'center', paddingTop: '16px' }}>
      <Text as='p' size='6' weight='bold'>
        Recipe Page
      </Text>

      <Box
        style={{
          background: 'var(--gray-a2)',
          borderRadius: 'var(--radius-3)',
        }}
      >
        <Container size='2'>
          <Button onClick={() => (window.location.href = '/recipe/add')}>
            <PlusCircledIcon />
            Post New Recipe
          </Button>
        </Container>
      </Box>

      <Grid gap='3' columns={'4'}>
        {recipes.map((recipe: any) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </Grid>
    </div>
  )
}

export default Recipe
