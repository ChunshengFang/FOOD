import { Recipe } from '@/types'
import http from '../lib/http'

const getRecipe = async (id: string) => await http.get(`/api/recipes/${id}`)
const getRecipes = async () => await http.get('/api/recipes')
const addRecipe = async (recipe: Recipe) => {
  return await http.request({
    url: '/api/recipes',
    method: 'POST',
    data: recipe,
    withCredentials: true,
  })
}

const searchRecipes = async (keyword: string) => {
  const res: any = await http.get('/api/search/recipes', { params: { keyword } })
  return res
}

const getTrendingRecipes = async() => {
  const res: any = await http.get('/api/trending/recipes')
  return res
}
export { getRecipe, getRecipes, addRecipe, searchRecipes, getTrendingRecipes }
