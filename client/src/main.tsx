import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from "./App.tsx";
import { ThemeProvider } from '@/components/theme-provider.tsx'
import './index.css'
import App from '@/routes/App.tsx'
import '@radix-ui/themes/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'

import ErrorPage from '@/pages/error-page'
import Discovery from './pages/discovery'
import Nutrition from './pages/nutrition'
import Recipe from './pages/recipe'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'

import RecipeDetail, { loader as recipeLoader } from './routes/RecipeDetail'
import RecipeAdd from './pages/recipe-add'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/discovery',
        element: <Discovery />,
      },
      {
        path: '/Nutrition',
        element: <Nutrition />,
      },
      {
        path: '/Recipe',
        element: <Recipe />,
      },
      {
        path: '/Recipe/Add',
        element: <RecipeAdd />,
      },
      {
        path: '/Recipes/:id',
        loader: recipeLoader,
        element: <RecipeDetail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
)
