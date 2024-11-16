import { Input } from '@/components/ui/input'
import { Container, Tabs, Text, Box, Button } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { searchUsers } from '@/api/auth'
import { searchRecipes } from '@/api/recipes'
// gen corde
const Discovery = () => {
  const [userInput, setUserInput] = useState('')
  const [recipeInput, setRecipeInput] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [recipes, setRecipes] = useState<any[]>([])
  const onSearchUsers = async () => {
    console.log('search users', userInput)
    const items: any[] = await searchUsers(userInput)
    console.log('users', items)
    if (items) {
      setUsers(items)
    }
  }

  const onSearchRecipes = async () => {
    console.log('search recipes', recipeInput)
    const items: any[] = await searchRecipes(recipeInput)
    console.log('recipes', items)
    if (items) {
      setRecipes(items)
    }
  }

  return (
    <div className='text-center w-[600px] m-auto p-10'>
      <h1>Discovery: Search and Explore</h1>
      <Container>
        <Tabs.Root defaultValue='users'>
          <Tabs.List>
            <Tabs.Trigger value='users'>Users</Tabs.Trigger>
            <Tabs.Trigger value='recipes'>Recipes</Tabs.Trigger>
          </Tabs.List>

          <Box pt='3'>
            <Tabs.Content value='users'>
              <Text size='2'>Search Users.</Text>

              <br />
              <div className='flex justify-center  items-center'>
                <Input
                  className='w-[200px] '
                  type='text'
                  placeholder='Search Users'
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                &nbsp; &nbsp;
                <Button onClick={onSearchUsers}>
                  <SearchIcon />
                  <Text>Search Users</Text>
                </Button>
              </div>
              <ul>
                {users.map((user: any) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
            </Tabs.Content>
            <Tabs.Content value='recipes'>
              <Text size='2'>search recipes.</Text>
              <br />
              <div className='flex justify-center  items-center'>
                <Input
                  className='w-[200px] '
                  type='text'
                  placeholder='Search Recipes'
                  value={recipeInput}
                  onChange={(e) => setRecipeInput(e.target.value)}
                />
                &nbsp; &nbsp;
                <Button onClick={onSearchRecipes}>
                  <SearchIcon />
                  <Text>Search Recipes</Text>
                </Button>
              </div>
              <ul>
                {recipes.map((recipe: any) => (
                  <li key={recipe.id}>
                    <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
                  </li>
                ))}
              </ul>
            </Tabs.Content>

            <Tabs.Content value='foods'></Tabs.Content>
          </Box>
        </Tabs.Root>
      </Container>
    </div>
  )
}

export default Discovery
