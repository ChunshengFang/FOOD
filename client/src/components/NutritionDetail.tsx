import { calculateTotalNutrition } from '@/api/nutrition'
import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  ChevronDownIcon,
  ThickChevronRightIcon,
  Text,
} from '@radix-ui/themes'
import * as Collapsible from '@radix-ui/react-collapsible'

const NutritionDetail = ({ recipeId = '' }) => {
  const [nutritionData, setNutritionData] = useState<any>({})
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (recipeId) {
      calculateTotalNutrition(recipeId).then((data) => {
        setNutritionData(data)
      })
    }
  }, [recipeId])

  return (
    <Box className='w-[300px]'>
      <Card>
        <Text size='4' weight='bold'>
          Total: {nutritionData?.total?.toFixed(2)} kcal
        </Text>
        <br />

        <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
          <Collapsible.Trigger>
            <div className='flex flex-row items-center gap-2 justify-between border-b-2 border-blue-300 2'>
              check the details{' '}
              {isOpen ? <ChevronDownIcon /> : <ThickChevronRightIcon />}
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <ul>
              {nutritionData?.nutrientsSummary &&
                Object.keys(nutritionData?.nutrientsSummary).map((key) => {
                  return (
                    <li key={key}>
                      {key}: {nutritionData?.nutrientsSummary[key]}
                    </li>
                  )
                })}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card>
    </Box>
  )
}

export default NutritionDetail
