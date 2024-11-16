import { getAllReviewsByRecipe } from '@/api/review'
import { Box, Button, Card, Text, TextArea } from '@radix-ui/themes'
import { useState } from 'react'
import { addReview } from '@/api/review'
import Rating from './recipe/Rating'
import RatingList from './recipe/RatingList'

const RatingReview = ({ recipeId = '' }) => {
  const [fetching, setFetching] = useState(false)
  const [reviews, setReviews] = useState<any>([])
  const [newReview, setNewReview] = useState({ rating: 0, message: '' })
  const onAddReview = async () => {
    console.log('add review', newReview)
    await addReview(recipeId, newReview.rating, newReview.message)
    getReivews()
  }

  const getReivews = async () => {
    const { items }: any = await getAllReviewsByRecipe(recipeId)
    if (items && items.length > 0) {
      setReviews(items)
    }
  }
  if (!fetching) {
    setFetching(true)
    getReivews()
  }

  return (
    <>
      {reviews.length === 0 ? (
        <Box>
          <Text as='p'>No reviews yet</Text>
        </Box>
      ) : (
        <Box>
          <RatingList ratings={reviews} />
        </Box>
      )}
      <Card>
        <Text as='p'>Your rating</Text>

        <Rating
          onChange={(value) => setNewReview({ ...newReview, rating: value })}
        />
        <Text as='p'>Your review</Text>
        <TextArea
          id='message'
          placeholder='message'
          value={newReview.message}
          className='w-[260px] '
          rows={4}
          cols={50}
          onChange={(e) =>
            setNewReview({ ...newReview, message: e.target.value })
          }
        />
        <br />
        <Button onClick={onAddReview}>Add a review</Button>
      </Card>
    </>
  )
}

export default RatingReview
