import { useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { FaStar } from 'react-icons/fa'
import './Rating.css' // 如果需要自定义样式，可以添加此文件

type RatingProps = {
  onChange?: (rating: number) => void
}
const Rating = ({ onChange }: RatingProps) => {
  const [rating, setRating] = useState(0)

  return (
    <div className='rating'>
      <RadioGroup.Root
        value={rating.toString()}
        onValueChange={(value) => {
          setRating(parseInt(value))
          onChange && onChange(parseInt(value))
        }}
      >
        <div style={{ display: 'flex' }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <RadioGroup.Item
              key={value}
              value={value.toString()}
              className='radio-item'
            >
              <FaStar
                className='star'
                style={{
                  color: value <= rating ? '#FFD700' : '#ccc',
                  cursor: 'pointer',
                }}
              />
            </RadioGroup.Item>
          ))}
        </div>
      </RadioGroup.Root>
      <p>score：{rating}</p>
    </div>
  )
}

export default Rating
