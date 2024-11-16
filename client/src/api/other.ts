import http from '@/lib/http'

const searchIngredients = (ingredientName: string) => {
  const res: any = http.get(`/api/nutrition/ingredients/${ingredientName}`)
  return res
}

export { searchIngredients }
