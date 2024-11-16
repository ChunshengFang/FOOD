type UserInfo = {
  id: string
  username: string
  avatarUrl: string
  email: string
}

type Recipe = {
  id?: string
  title: string
  description: string
  imageUrl: string
  ingredients: any[],
  user?: any,
  dietaryRestrictions: string[]
}

export type { UserInfo, Recipe }
