import http from '../lib/http'

const getAllReviewsByUser = async (userId: string) => {
  const url = `/api/users/${userId}/reviews`
  const res = await http.get(url)
  return res
}

const getAllReviewsByRecipe = async (recipeId: string) => {
  const url = `/api/recipes/${recipeId}/reviews`
  const res = await http.get(url)
  return res
}

const addReview = async (
  recipeId: string,
  rating: number,
  message?: string
) => {
  const res: any = await http.request({
    method: 'POST',
    url: `/api/recipes/${recipeId}/rate`,
    data: {
      rating,
      message,
    },
    withCredentials: true,
  })

  return res
}

export { addReview, getAllReviewsByUser, getAllReviewsByRecipe }
