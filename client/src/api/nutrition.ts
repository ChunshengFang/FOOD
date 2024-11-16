import http from '@/lib/http'

const searchIngredients = async (ingredientName: string) => {
  const res: any = await http.get(
    `/api/nutrition/ingredients/${ingredientName}`
  )
  return res
}

const fetchAllFoods = async () => {
  const res: any = await http.get('/api/nutrition/foods')
  return res
}

const calculateTotalNutrition = async (
  recipeId: string
): Promise<{
  total: number
  recipe: any
  nutrientsSummary: any
}> => {
  const res: any = await http.get(`/api/nutrition/recipes/${recipeId}`)
  return res
}

export { searchIngredients, fetchAllFoods, calculateTotalNutrition }
