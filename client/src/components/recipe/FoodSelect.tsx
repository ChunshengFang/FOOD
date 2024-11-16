'use client'

import React, { useState, useEffect } from 'react'
import * as Select from '@radix-ui/react-select'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'

type FoodItem = {
  foodId: string
  description: string
  amount: number
  unit: string
}

type FoodOption = {
  value: string
  label: string
  unit: string
}

interface Props {
  foodOptions: FoodOption[]
  onChanged: (foods: FoodItem[]) => void
}

export default function Component({ foodOptions, onChanged }: Props) {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([])
  const [currentFood, setCurrentFood] = useState('')
  const [currentAmount, setCurrentAmount] = useState(1)

  useEffect(() => {
    if (currentFood) {
      const existingFood = selectedFoods.find(
        (food) => food.description === currentFood
      )
      if (existingFood) {
        setCurrentAmount(existingFood.amount)
      } else {
        setCurrentAmount(1)
      }
    }
  }, [currentFood, selectedFoods])

  const handleAddFood = () => {
    if (currentFood) {
      setSelectedFoods((prevFoods) => {
        const existingFoodIndex = prevFoods.findIndex(
          (food) => food.description === currentFood
        )
        if (existingFoodIndex !== -1) {
          // Update existing food item
          const updatedFoods = [...prevFoods]
          updatedFoods[existingFoodIndex] = {
            ...updatedFoods[existingFoodIndex],
            amount: currentAmount,
          }
          return updatedFoods
        } else {
          // Add new food item
          const _food = foodOptions.find(
            (item) => item.value === currentFood
          ) || { label: '', unit: '' }
          return [
            ...prevFoods,
            {
              foodId: currentFood,
              description: _food.label,
              amount: currentAmount,
              unit: _food.unit,
            },
          ]
        }
      })
      setCurrentFood('')
      setCurrentAmount(1)
    }
  }

  useEffect(() => {
    onChanged(selectedFoods)
  }, [selectedFoods])

  const handleRemoveFood = (id: string) => {
    setSelectedFoods(selectedFoods.filter((food) => food.foodId !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Selected foods:', selectedFoods)
    // Here you would typically send this data to a server or perform some other action
  }

  return (
    <div
      onSubmit={handleSubmit}
      className='w-[360px]  bg-white-400 p-4 rounded-lg shadow-md'
    >
      <div className='mb-4'>
        <label
          htmlFor='food-select'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Select a food
        </label>
        <Select.Root value={currentFood} onValueChange={setCurrentFood}>
          <Select.Trigger
            id='food-select'
            className='inline-flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <Select.Value placeholder='Select a food' />
            <Select.Icon>
              <ChevronDownIcon className='w-4 h-4 text-gray-400' />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className='overflow-hidden bg-white rounded-md shadow-lg'>
              <Select.ScrollUpButton className='flex items-center justify-center h-6 bg-white text-gray-700 cursor-default'>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className='p-2'>
                {foodOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className='relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md select-none hover:bg-blue-100 focus:bg-blue-100 focus:outline-none'
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className='absolute left-2 inline-flex items-center'>
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 15 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z'
                          fill='currentColor'
                          fillRule='evenodd'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className='flex items-center justify-center h-6 bg-white text-gray-700 cursor-default'>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='amount'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Amount
        </label>
        <input
          type='number'
          id='amount'
          value={currentAmount}
          onChange={(e) => setCurrentAmount(Number(e.target.value))}
          min='1'
          className='w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        />
      </div>

      <button
        type='button'
        onClick={handleAddFood}
        className='w-full mb-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center'
      >
        <PlusIcon className='w-4 h-4 mr-2' />
        Add Food
      </button>

      {selectedFoods.length > 0 && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Selected Foods:</h3>
          <ul className='space-y-2'>
            {selectedFoods.map((food) => (
              <li
                key={food.foodId}
                className='flex items-center justify-between bg-gray-100 p-2 rounded'
              >
                <span>
                  {food.description} ({food.amount}
                  {food.unit})
                </span>
                <button
                  type='button'
                  onClick={() => handleRemoveFood(food.foodId)}
                  className='text-red-600 hover:text-red-800 focus:outline-none'
                  aria-label={`Remove ${food.description}`}
                >
                  <TrashIcon className='w-4 h-4' />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
