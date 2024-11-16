import { FaStar } from 'react-icons/fa'
import { Text } from '@radix-ui/themes'
import './Rating.css' // 如果需要自定义样式，可以添加此文件

type RatingListProps = {
  ratings: Array<{
    rating: number
    message: string
  }>
}
const RatingList = ({ ratings }: RatingListProps) => {
  return (
    <div className='rating-list'>
      <Text>Review List</Text>
      {ratings.map((item, index) => (
        <div key={index} className='rating-item'>
          <div className='stars'>
            {[...Array(5)].map((_, starIndex) => (
              <FaStar
                key={starIndex}
                style={{ color: starIndex < item.rating ? '#FFD700' : '#ccc' }}
              />
            ))}
          </div>
          <p className='message'>{item.message}</p>
        </div>
      ))}
    </div>
  )
}

export default RatingList
