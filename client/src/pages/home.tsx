// import { FAQ } from "@/components/FAQ";
import { TargetAudience } from '@/components/home/TargetAudience'
import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { TrendingRecipes } from '@/components/home/TrendingRecipes'

function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TargetAudience />
      {/* <Services /> */}
      <TrendingRecipes />
    </>
  )
}

export default Home
