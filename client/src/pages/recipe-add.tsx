import { useEffect, useState } from 'react'
import { Recipe } from '@/types'
import { Button, TextArea } from '@radix-ui/themes'
import { addRecipe } from '@/api/recipes'
// import React from 'react'
import * as Label from '@radix-ui/react-label'
import FoodSelect from '@/components/recipe/FoodSelect'

import LabelInput from '@/components/ui/labelInput'
import { fetchAllFoods } from '@/api/nutrition'

// import Label from '@radix-ui/react-label'
export default function RecipeAdd() {
  const [recipe, setRecipe] = useState<Recipe>({
    title: '',
    description: '',
    ingredients: [],
    dietaryRestrictions: [],
    imageUrl: '',
  })

  const onAddRecipe = async () => {
    const newRecipe: any = await addRecipe(recipe)
    console.log('new recipe', newRecipe)
    if (newRecipe && newRecipe.title) {
      alert('Recipe added successfully!')
      window.location.href = '/recipe'
    }
  }

  const [foodsOptions, setFoodsOptions] = useState<any[]>([])
  useEffect(() => {
    // fetch foods from server and set foods options
    const fetchFoods = async () => {
      const { items } = await fetchAllFoods()
      setFoodsOptions(
        items.map((food: any) => ({
          value: food.fdcId + '',
          unit: food.servingSizeUnit,
          label: food.description,
        }))
      )
    }
    fetchFoods()
  }, [])

  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '16px',
        margin: '0 auto',
        maxWidth: '800px',
      }}
      className='flex flex-col items-center justify-center  '
    >
      <h1>Add a Recipe</h1>

      <div className='flex flex-col gap-[10px] m-4 rounded-[5px] border-[1px] border-slate-100 bg-slate-100 p-[20px] w-[80%]'>
        <LabelInput
          label='Title'
          placeholder='Title'
          value={recipe.title}
          onChange={(e: any) => setRecipe({ ...recipe, title: e.target.value })}
          id='title'
        />
        <br />
        <div className='flex flex-wrap items-center justify-end gap-[15px] px-5'>
          <Label.Root
            className='text-[15px] font-medium leading-[35px] text-slate-500'
            htmlFor='description'
          >
            Description{' '}
          </Label.Root>
          <TextArea
            id='description'
            placeholder='Description'
            value={recipe.description}
            className='w-[360px] '
            rows={4}
            cols={50}
            onChange={(e) =>
              setRecipe({ ...recipe, description: e.target.value })
            }
          />
        </div>
        <br />
        <div className='flex flex-wrap items-center justify-end gap-[15px] px-5'>
          <Label.Root
            className='text-[15px] font-medium leading-[35px] text-slate-500'
            htmlFor='Ingredients'
          >
            Ingredients{' '}
          </Label.Root>
          <FoodSelect
            foodOptions={foodsOptions}
            onChanged={(e) => {
              console.log('on foods changed', e)
              setRecipe({
                ...recipe,
                ingredients: e,
              })
            }}
          />
        </div>
        <br />
        <LabelInput
          label='Dietary Restrictions'
          placeholder='dietaryRestrictions'
          value={recipe.dietaryRestrictions}
          onChange={(e: any) =>
            setRecipe({
              ...recipe,
              dietaryRestrictions: e.target.value.split(', '),
            })
          }
          id='dietaryRestrictions'
        />
        <br />

        <LabelInput
          label='Image URL'
          placeholder='Image URL'
          value={recipe.imageUrl}
          onChange={(e: any) =>
            setRecipe({
              ...recipe,
              imageUrl: e.target.value,
            })
          }
          id='dietaryRestrictions'
        />

        <br />
        <Button onClick={onAddRecipe}>Add Recipe</Button>
      </div>
    </div>
  )
}
